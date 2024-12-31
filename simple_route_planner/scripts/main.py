#!/usr/bin/env python3

from curses import raw
import sys
from tokenize import String
from tracemalloc import start
from turtle import home
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from UI import Ui_Dialog  
from my_function import MyFunction as Myfunc
import csv
from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
import rospy
from std_msgs.msg import Empty
import actionlib
from simple_route_planner.msg import *

class RouteGeneration(QDialog):


    def __init__(self,parent=None):
        super(RouteGeneration,self).__init__(parent)

        rospy.init_node( 'simple_route_planner' )

        self.server = actionlib.SimpleActionServer( 'simple_route_planner', RouteGenAction, self.OrderCallback, False )
        self.server.start()

        self.setAcceptDrops(True)

        self.ui = Ui_Dialog()
        self.ui.setupUi(self)

        layout = self.ui.verticalLayout
        self.Figure = plt.figure()
        self.canvas = FigureCanvas(self.Figure)
        layout.addWidget(self.canvas)
        self.insert_ax()

        self.point = None
        self.list_x = []
        self.list_y = []
        self.list_readable = list()
        # self.up = self.ui.checkBox
        self.Upper = self.ui.upper
        self.Fastest = self.ui.fastest
        self.Lower = self.ui.lower
        self.start_x = self.ui.start_x
        self.end_x = self.ui.end_x
        self.end_y = self.ui.end_y
        self.start_y = self.ui.start_y
        self.deep_y  =self.ui.deep_y
        self.start_yaw  = self.ui.start_yaw
        self.end_yaw = self.ui.end_yaw
        self.start_speed = self.ui.start_speed
        self.middle_speed = self.ui.middle_speed
        self.end_speed = self.ui.end_speed
        self.point = self.ui.point

    def OrderCallback( self, goal ):
        rospy.loginfo( 'coming' )

        speed = 0.5

        if( goal.upper == 1 ):
            # fastest
            speed = 0.6
        elif( goal.upper == 0 ):
            # upper
            speed = 0.6
        elif( goal.upper == 2 ):
            # lower
            speed = 0.4


        self.Run(
            goal.start.x,
            goal.start.y,
            goal.end.x,
            goal.end.y,
            0.45,
            0.2,
            speed,
            0.02,
            goal.start.theta,
            goal.end.theta,
            goal.point_num,
            goal.upper,
            goal.FilePath
        )
        self.server.set_succeeded()

    def insert_ax(self):

        self.ax = self.canvas.figure.subplots()
        plt.grid()
        self.bar = None

    def Generate(self):
        if(self.ui.upper.isChecked()):
            mode = 0
            # upper
        if (self.ui.fastest.isChecked()):
            mode = 1
            # fastest
        if(self.ui.lower.isChecked()):
            mode = 2
            # lower
        self.ax.tick_params(labelbottom=False,labelleft=False,labelright=False,labeltop=False)
        self.insert_ax()
        self.ax.clear()
        point = int(self.point.text())
        start_x = float(self.start_x.text())
        start_y = float(self.start_y.text())
        end_x = float(self.end_x.text())
        end_y = float(self.end_y.text())
        deep_y = float(self.deep_y.text())
        start_speed = float(self.start_speed.text())
        middle_speed = float(self.middle_speed.text())
        end_speed = float(self.end_speed.text())
        start_yaw = float(self.start_yaw.text())
        end_yaw = float(self.end_yaw.text())
        self.Run(start_x,start_y,end_x,end_y,deep_y,start_speed,middle_speed,end_speed,start_yaw,end_yaw,point,mode,None)
        self.bar =  self.ax.plot(self.list_x,self.list_y,color = "red")
        plt.grid()
        self.canvas.draw()
        return 0

    def Run(self,start_x,start_y,end_x,end_y,deep_y,start_speed,middle_speed,end_speed,start_yaw,end_yaw,point,mode,path):
        print(mode)
        self.list_x,self.list_y,self.list_speed,self.list_yaw,self.list_readable = Myfunc.GenerateRoute(start_x,start_y,end_x,end_y,deep_y,start_speed,middle_speed,end_speed,start_yaw,end_yaw,point-1,mode)
        try:
            #情報の保存
            header = ["X","Y","yaw","velocity","readable"]
            output_list = []
            for i in range(len(self.list_x)):
                data_list = [self.list_x[i],self.list_y[i],self.list_yaw[i],self.list_speed[i],self.list_readable[i]]
                output_list.append(data_list)

            with open(path,"w")as f:
                writer = csv.writer(f)
                writer.writerow(header)
                writer.writerows(output_list)
            
            f.close()
            print("savedfile")
        except:
            print("error : invalid path")


        
        

    def Save(self):
        try:
            #情報の保存
            file_name, _ = QFileDialog.getSaveFileName(self)
            path = str(Path(file_name).with_suffix(".csv"))
            header = ["X","Y","yaw","velocity","readable"]
            output_list = []
            for i in range(len(self.list_x)):
                data_list = [self.list_x[i],self.list_y[i],self.list_yaw[i],self.list_speed[i],self.list_readable[i]]
                output_list.append(data_list)

            with open(path,"w")as f:
                writer = csv.writer(f)
                writer.writerow(header)
                writer.writerows(output_list)
            
            f.close()
            print("savedfile")
        except:
            return 0

    def Above(self):
        self.point = True
        return 0

    def Under(self):
        self.point = False
        return 0
        
if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = RouteGeneration()
    # window.show()
    # sys.exit(app.exec_())
    rospy.spin()


