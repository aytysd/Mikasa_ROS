import sys
from PyQt5 import QtWidgets, QtGui
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from MainUI import Ui_RouteGeneration
import my_functions 
import csv
import math
import matplotlib.pyplot as plt
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas

class RouteGeneration(QDialog):

    mode = True
    def __init__(self,parent=None):
        super(RouteGeneration,self).__init__(parent)


        self.setAcceptDrops(True)

        self.ui = Ui_RouteGeneration()
        self.ui.setupUi(self)

        layout = self.ui.verticalLayout
        self.Figure = plt.figure()
        self.canvas = FigureCanvas(self.Figure)
        layout.addWidget(self.canvas)
        self.insert_ax()
        self.conect()
        self.unclicked = True
        self.movepoint = None
        self.list_readable = list()
        self.list_map_x = [0,10.4,10.4,9.2,9.2,1.2,1.2,0,0]
        self.list_map_y = [0,0,1.2,1.2,2.5,2.5,1.2,1.2,0]
        self.View = self.ui.verticalLayoutWidget
        self.Browser = self.ui.textBrowser
        self.Log = self.ui.textBrowser_2
        self.Table = self.ui.tableWidget
        self.Trancelational = self.ui.Edit_TrancelationalConvergenceError

        #path
        self.red_zone = self.ui.RedZone
        self.blue_zone = self.ui.BlueZone
        self.sh1 = self.ui.shootspot1
        self.sh2 = self.ui.shootspot2
        self.sh3 = self.ui.shootspot3
        self.sh4 = self.ui.shootspot4
        self.goto = self.ui.goto_2
        self.nomal_return = self.ui.nomal_return
        self.upper = self.ui.upper
        self.Lower = self.ui.lower
        self.fastest = self.ui.fastest

        self.red_zone.setChecked(True)
        self.sh1.setChecked(True)
        self.goto.setChecked(True)
        self.upper.setChecked(True)

        self.table_item = QtWidgets.QTableWidgetItem()
        self.graphics_vew = QtWidgets.QGraphicsView()

        self.RootPath = '/home/ayato/catkin_ws/src/2022/pure_pursuit/csv/'
        # self.RootPath = '/home/takeuchi/catkin_ws/src/route_planner/csv/'

        self.setRootPath(
            self.RootPath + 'RedZone/ShootSpot1/goto/upper.csv',
            self.RootPath + 'BlueZone/ShootSpot5/goto/upper.csv'
            )

        self.ui.Edit_TrancelationalConvergenceError.setText("20")
        self.acceleration = 0.0
        self.velocity = 0.0
        self.convergence_error = 0.0
        self.rotational_convergence_error = 0.0
        self.control_cycle = 0.0
        self.interpolation_accuracy = 0.0
        self.point_count = int(self.ui.Edit_TrancelationalConvergenceError.text())
        self.images = QtGui.QImage()
        self.pixmap = QtGui.QPixmap.fromImage(self.images)

    def conect(self):
        self.canvas.figure.canvas.mpl_connect('button_press_event', self.onclick)

        self.canvas.figure.canvas.mpl_connect('button_release_event', self.on_release)
        self.canvas.figure.canvas.mpl_connect('motion_notify_event', self.on_motion)

    def AddControlPoint(self):

        self.Table.insertRow(self.Table.currentRow()+1)

        for i in range(4):
            self.Table.setItem(self.Table.currentRow()+1,i,QTableWidgetItem("0"))

    def SaveConditions(self):
        my_functions.MyFunctions.SaveCSV(self)

    def GenerateRoute(self):
        
        self.ax.tick_params(labelbottom=False,labelleft=False,labelright=False,labeltop=False)
        self.insert_ax()
        self.ax.clear()
        RouteGeneration.mode = True
        my_functions.MyFunctions.generate_straight(self,30)

        plt.grid()
        self.map = self.ax.plot(self.list_map_x,self.list_map_y,color = "green")
        self.bar = self.ax.plot(self.list_x,self.list_y,color = "red")

        for i in range(self.Table.rowCount()):
            self.point = self.ax.plot(float(self.Table.item(i,0).text()),float(self.Table.item(i,1).text()),'.',markersize = 10,color = "blue")
        plt.xlim(-0.5,11)
        plt.ylim(-0.5,11)
        self.canvas.draw()

        try:
            header = ["X","Y","yaw","velocity","readable"]
            output_list = []
            output_list_mirror =[]
            list_yaw_mirror = list()

            for i in range(len(self.list_x)):
                data_list = [self.list_x[i],self.list_y[i],self.list_yaw[i],self.list_vel[i],self.list_readable[i]]
                output_list.append(data_list)

            with open(self.my_path,"w")as f:
                writer = csv.writer(f)
                writer.writerow(header)
                writer.writerows(output_list)
        except:
            self.Log.append("保存に失敗しました。")
        try:
            list_x_mirror = my_functions.MyFunctions.Mirror_data(self.list_x)

            for i in range(len(self.list_yaw)):
                if(self.list_yaw[i] != round(math.pi,3)):
                    if(self.list_yaw[i] == 0):
                        list_yaw_mirror.append(0.00)
                    else:
                        list_yaw_mirror.append(round((math.pi*2-self.list_yaw[i]),3))
                else:
                    list_yaw_mirror.append(self.list_yaw[i])

            for i in range(len(self.list_x)):
                data_list = [round(list_x_mirror[i],5),self.list_y[i],list_yaw_mirror[i],self.list_vel[i],self.list_readable[i]]
                output_list_mirror.append(data_list)

            with open(self.my_path_mirror,"w")as f:
                writer = csv.writer(f)
                writer.writerow(header)
                writer.writerows(output_list_mirror)

        except:
            self.Log.append('反転の保存に失敗しました。')
            print('error')
            return 0

        # subprocess.run( "/home/ayato/catkin_ws/src/2022/route_planner/csv/sync2thinkpad.bash" )

    def AddObstacle(self):

        self.ObTable.insertRow(self.ObTable.currentRow()+1)

        for i in range(4):
            self.ObTable.setItem(self.ObTable.currentRow()+1,i,QTableWidgetItem("0"))

    
    def RemoveObstacle(self):

        self.ObTable.removeRow(self.ObTable.currentRow())


    def ShowCurvature(self):
        return 0

    def RemoveControlPoint(self):

        self.Table.removeRow(self.Table.currentRow())
        
    def LoadData(self):
        for i in range(self.Table.rowCount()):
            self.Table.removeRow(0)
        my_list =  my_functions.MyFunctions.LoadData(self)
        list_count =int(round(len(my_list)/100,0))

        for i in range(self.Table.rowCount()):
            self.Table.removeRow(0)

        for i in range(int(list_count+1)):
            self.Table.selectRow(i-1)
            self.Table.insertRow(self.Table.currentRow()+1)

            for ii in range(4):
                self.Table.setItem(i,ii,QTableWidgetItem(str(my_list[i*100+1][ii])))

            RouteGeneration.GenerateRoute(self)

    def setRootPath( self, RootPath ,MirrorPath):
        self.my_path = RootPath 
        self.my_path_mirror = MirrorPath
        path = self.my_path    
        with open(path,encoding='utf8',newline='')as f:
            reader = csv.reader(f)
            my_list = [row for row in reader]

        for i in range(self.Table.rowCount()):
            self.Table.removeRow(0)
        self.point_num = list()
        count = 0
        for i in range(len(my_list)):
            if(str(my_list[i][4]) == "True"):
                self.Table.insertRow(count)
                count = count+1
                self.point_num.append(i)
        for i in range(count):
            for ii in range(4):
                self.Table.setItem(i,ii,QTableWidgetItem(my_list[self.point_num[i]][ii]))

        RouteGeneration.GenerateRoute(self)


    def ChangePath(self):
        self.my_path = self.RootPath
        self.my_path_mirror = self.RootPath
        
        if(self.red_zone.isChecked()):
            self.my_path = self.my_path+"RedZone/"
            self.my_path_mirror = self.my_path_mirror+"BlueZone/"
        else: 
            self.my_path = self.my_path+"BlueZone/"
            self.my_path_mirror = self.my_path_mirror+"RedZone/"

        if(self.sh1.isChecked()):
            self.my_path = self.my_path+"ShootSpot1/"
            self.my_path_mirror = self.my_path_mirror+"ShootSpot5/"
        else:
            if(self.sh2.isChecked()):
                self.my_path = self.my_path+"ShootSpot2/"
                self.my_path_mirror = self.my_path_mirror+"ShootSpot4/"
            else:
                if(self.sh3.isChecked()):
                    self.my_path = self.my_path+"ShootSpot3/"
                    self.my_path_mirror = self.my_path_mirror+"ShootSpot3/"
                else:
                    if(self.sh4.isChecked()):
                        self.my_path = self.my_path+"ShootSpot4/"
                        self.my_path_mirror = self.my_path_mirror+"ShootSpot2/"
                    else:
                        self.my_path = self.my_path+"ShootSpot5/"
                        self.my_path_mirror = self.my_path_mirror+"ShootSpot1/"

        if(self.goto.isChecked()):
            self.my_path = self.my_path+"goto/"
            self.my_path_mirror = self.my_path_mirror+"goto/"
            self.fastest.setEnabled(True)
        else:
            self.my_path = self.my_path+"return/"
            self.my_path_mirror = self.my_path_mirror+"return/"
            self.fastest.setEnabled(True)

        if(self.upper.isChecked()):
            self.my_path = self.my_path+"upper.csv"
            self.my_path_mirror = self.my_path_mirror+"upper.csv"
        else:
            if(self.Lower.isChecked()):
                self.my_path = self.my_path+"lower.csv"
                self.my_path_mirror = self.my_path_mirror+"lower.csv"
            else:
                self.my_path = self.my_path+"fastest.csv"
                self.my_path_mirror = self.my_path_mirror+"fastest.csv"

        path = self.my_path
        with open(path,encoding='utf8',newline='')as f:
            reader = csv.reader(f)
            my_list = [row for row in reader]

        for i in range(self.Table.rowCount()):
            self.Table.removeRow(0)
        self.point_num = list()
        count = 0
        for i in range(len(my_list)):
            if(str(my_list[i][4]) == "True"):
                self.Table.insertRow(count)
                count = count+1
                self.point_num.append(i)
        for i in range(count):
            for ii in range(4):
                self.Table.setItem(i,ii,QTableWidgetItem(my_list[self.point_num[i]][ii]))
        RouteGeneration.GenerateRoute(self)



    def on_motion(self,event):
        self.Browser.clear()
        self.Browser.append("select: "+str(self.movepoint))
        try:
            self.Browser.append("x: "+str(round(event.xdata,2)))
            self.Browser.append("y: "+str(round(event.ydata,2)))
        except:
            self.Browser.append("x: -")
            self.Browser.append("y: -")


    def onclick(self,event):
        try:    
            if event.button ==1:
                x = event.xdata
                y = event.ydata
                shortest_point = None
                if(self.unclicked == True):
                    for i in range(self.Table.rowCount()):
                        point_x = float(self.Table.item(i,0).text())
                        point_y = float(self.Table.item(i,1).text())
                        if((abs(x-point_x)<0.5)&(abs(y-point_y)<0.5)):
                            self.movepoint = i
                            self.unclicked = False
        except:
            return 0


    def on_release(self,event):
        if(self.unclicked == False):
            selected_point = self.movepoint
            self.Table.setItem(selected_point,0,QTableWidgetItem(str(round(float(event.xdata),2))))
            self.Table.setItem(selected_point,1,QTableWidgetItem(str(round(float(event.ydata),2))))
            self.movepoint = None
            RouteGeneration.GenerateRoute(self)
            self.unclicked = True


    def dragEnterEvent(self,e):
        m = e.mimeData()
        if(m.hasText()): # 文字列があるかどうか確認

            file_name = e.mimeData().text()
            file_name
            path = file_name[7:]
            path = path[:-2]
            with open(path,encoding='utf8',newline='')as f:
                reader = csv.reader(f)
                my_list = [row for row in reader]

            for i in range(self.Table.rowCount()):
                self.Table.removeRow(0)
            self.point_num = list()
            count = 0
            for i in range(len(my_list)):
                if(str(my_list[i][4]) == "True"):
                    self.Table.insertRow(count)
                    count = count+1
                    self.point_num.append(i)
            for i in range(count):
                for ii in range(4):
                    self.Table.setItem(i,ii,QTableWidgetItem(my_list[self.point_num[i]][ii]))

            RouteGeneration.GenerateRoute(self)


    def insert_ax(self):

        self.ax = self.canvas.figure.subplots()
        plt.grid()
        self.bar = None

    def edit_max_jerk(self,str):

        return 0

    def edit_max_acceleration(self,str):


        return 0
    def edit_max_velocity(self,str):

        return 0

    def trancelational_convergence_error(self,str):
        try:
            self.point_count = int(self.Trancelational.text())
        except:
            return 0

    def rotate_convergence_error(self,str):
        
        return 0

    def control_cycle(self):

        return 0

    def complementary_accuracy(self):

        return 0

    def edit_cell(self):

        return 0

    def config_file(self):
        
        return 0

    
        
        
if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = RouteGeneration()
    window.show()
    sys.exit(app.exec_())


