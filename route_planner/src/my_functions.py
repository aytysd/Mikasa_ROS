from cmath import cos, pi
import math
from PyQt5.QtWidgets import *
from pathlib import Path
import csv

class MyFunctions():
    list_Ob_x = []
    list_Ob_y = []
    list_x = []
    list_y = []
    def __init__(self):
        self.list_x = []
        self.list_y = []
        self.list_yaw = []
        self.list_vel = []
        self.list_obstacle_data = []
        self.list_obstacle = []

    def CatMullCurve(Time,p0,p1,p2,p3):
        m0 = float((p2 - p0)*0.5)
        m1 = float((p3-p1)*0.5)

        d = float(p1-p2)
        a = float(2.0*d+m0+m1)
        b = float(-3.0*d-2.0*m0-m1)

        return ((a*Time+b)*Time+m0)*Time+p1

    def GetYaw(x0,x1,y0,y1):
        result = math.atan2((y1-y0),(x1-x0))*(180/math.pi)
        return result

    def generate(self,scene):
            self.list_x = list()
            self.list_y = list()
            self.list_yaw = list()
            self.list_vel = list()

            #始点〜の線の表示
            x0 = float(self.Table.item(0,0).text())
            x1 = float(self.Table.item(1,0).text())
            x2 = float(self.Table.item(2,0).text())

            y0 = float(self.Table.item(0,1).text())
            y1 = float(self.Table.item(1,1).text())
            y2 = float(self.Table.item(2,1).text())

            start_yaw = float(self.Table.item(0,2).text())
            finish_yaw = float(self.Table.item(1,2).text())
            start_vel = float(self.Table.item(0,3).text())
            finish_vel = float(self.Table.item(1,3).text())

            for i in range(100):
                t = i/100
                velocity = (finish_vel-start_vel)/100*i
                self.list_x.append(round(MyFunctions.CatMullCurve(t,x0,x0,x1,x2),3))
                self.list_y.append(round(MyFunctions.CatMullCurve(t,y0,y0,y1,y2),3))

                if(start_yaw<finish_yaw):
                    self.list_yaw.append(round((finish_yaw-start_yaw)/100*i,3))
                else :
                    self.list_yaw.append(round(start_yaw-(start_yaw-finish_yaw)/100*i,3))

                if(start_vel<finish_vel):
                    self.list_vel.append(round((finish_vel-start_vel)/100*i,3))
                else :
                    self.list_vel.append(round(start_vel-(start_vel-finish_vel)/100*i,3))

            
            #中間線表示
            if (self.Table.rowCount() > 3):
                for i in range(self.Table.rowCount()-3):
                    x0 = float(self.Table.item(i,0).text())
                    x1 = float(self.Table.item(i+1,0).text())
                    x2 = float(self.Table.item(i+2,0).text())
                    x3 = float(self.Table.item(i+3,0).text())

                    y0 = float(self.Table.item(i,1).text())
                    y1 = float(self.Table.item(i+1,1).text())
                    y2 = float(self.Table.item(i+2,1).text())
                    y3 = float(self.Table.item(i+3,1).text())

                    start_yaw = float(self.Table.item(i+1,2).text())
                    finish_yaw = float(self.Table.item(i+2,2).text())
                    start_vel = float(self.Table.item(i+1,3).text())
                    finish_vel = float(self.Table.item(i+2,3).text())

                    for I in range(100):
                        t = I/100
                        self.list_x.append(round(MyFunctions.CatMullCurve(t,x0,x1,x2,x3),3))
                        self.list_y.append(round(MyFunctions.CatMullCurve(t,y0,y1,y2,y3),3))

                        if(start_yaw<finish_yaw):
                            self.list_yaw.append(round(start_yaw+(finish_yaw-start_yaw)/100*I,3))
                            
                        else :
                            self.list_yaw.append(round(start_yaw-(start_yaw-finish_yaw)/100*I,3))

                        if(start_vel<finish_vel):
                            self.list_vel.append(round(start_vel+(finish_vel-start_vel)/100*I,3))
                            
                        else :
                            self.list_vel.append(round(start_vel-(start_vel-finish_vel)/100*I,3))

            
            #〜終点の線の表示 
                fp = int(self.Table.rowCount()-1)

                x0 = float(self.Table.item(fp-2,0).text())
                x1 = float(self.Table.item(fp-1,0).text())
                x2 = float(self.Table.item(fp,0).text())

                y0 = float(self.Table.item(fp-2,1).text())
                y1 = float(self.Table.item(fp-1,1).text())
                y2 = float(self.Table.item(fp,1).text())

                start_yaw = float(self.Table.item(fp-1,2).text())
                finish_yaw = float(self.Table.item(fp,2).text())
                start_vel = float(self.Table.item(fp-1,3).text())
                finish_vel = float(self.Table.item(fp,3).text())

                for i in range(102):
                    t = i/100
                    self.list_x.append(round(MyFunctions.CatMullCurve(t,x0,x1,x2,x2),3))
                    self.list_y.append(round(MyFunctions.CatMullCurve(t,y0,y1,y2,y2),3))

                    # if(start_yaw<finish_yaw):
                    #     self.list_yaw.append(round(start_yaw+(finish_yaw-start_yaw)/100*i,3))
                    # else :
                    #     self.list_yaw.append(round(start_yaw-(start_yaw-finish_yaw)/100*i,3))
                    
                    if(start_vel<finish_vel):
                        self.list_vel.append(round(start_vel+(finish_vel-start_vel)/100*i,3))
                    else :
                        self.list_vel.append(round(start_vel-(start_vel-finish_vel)/100*i,3))

                    if(finish_yaw == 0):
                        finish_yaw = math.pi*2
                    if((abs(finish_yaw-start_yaw)>math.pi)):
                        if((start_yaw>math.pi)&(abs(finish_yaw-start_yaw)>math.pi)):
                            yaw = start_yaw+(math.pi*2-start_yaw+finish_yaw)*t
                        else:
                            # print("右回り")
                            yaw = start_yaw-(math.pi*2-(finish_yaw-start_yaw))*t

                    else:
                        # print("左回り")
                        yaw = start_yaw+(finish_yaw-start_yaw)*t
                    if(yaw >= math.pi*2):
                        yaw = yaw-math.pi*2
                    if(yaw<0):
                        yaw = yaw +math.pi*2

                    self.list_yaw.append(round(yaw,3))
                if(finish_yaw == math.pi*2):
                    finish_yaw = 0
                
                self.list_yaw.append(round(finish_yaw,3))


    def SaveCSV(self):
        #情報の保存
        file_name, _ = QFileDialog.getSaveFileName(self)
        path = str(Path(file_name).with_suffix(".csv"))
        header = ["X","Y","yaw","velocity","readable"]
        output_list = []

        for i in range(len(self.list_x)):
            data_list = [self.list_x[i],self.list_y[i],self.list_yaw[i],self.list_vel[i],self.list_readable[i]]
            output_list.append(data_list)

        with open(path,"w")as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(output_list)
        
        f.close
        print("savedfile")

    def LoadData(self):
        # 情報の取り出し
        file_name = QFileDialog.getOpenFileName(self,"Open File","/home","CsvFiles (*.csv)")
        path = file_name[0]
        self.path = path
        print(path)
        with open(path,encoding='utf8',newline='')as f:
            reader = csv.reader(f)
            content = [row for row in reader]
        # print(content)
        self.load_path = content
        return content
        

    def get_Ob_data():
        return MyFunctions.list_Ob_x,MyFunctions.list_Ob_y
    
    def collect_data(self):
        MyFunctions.list_x = list()
        MyFunctions.list_y = list()
        MyFunctions.list_th = list()
        MyFunctions.list_v = list()
        for i in range (self.Table.rowCount()):
            MyFunctions.list_x.append(float(self.Table.item(i,0).text()))
            MyFunctions.list_y.append(float(self.Table.item(i,1).text()))
            MyFunctions.list_th.append(float(self.Table.item(i,2).text()))
            MyFunctions.list_v.append(float(self.Table.item(i,3).text()))
    def get_list():

        return MyFunctions.list_x,MyFunctions.list_y,MyFunctions.list_th,MyFunctions.list_v


    def get_point(self):
        list_x = list()
        list_y = list()
        for i in range(self.Table.rowCount()):
            list_x.append(self.Table.item(i,0).text())
            list_y.append(self.Table.item(i,1).text())
            

    def generate_straight(self,point):
            self.list_x = list()
            self.list_y = list()
            self.list_vel = list()
            self.list_yaw = list()
            self.list_readable = list()
            yaw_minus = False
            for i in range(self.Table.rowCount()-1):
                x0 = float(self.Table.item(i,0).text())
                x1 = float(self.Table.item(i+1,0).text())
                y0 = float(self.Table.item(i,1).text())
                y1 = float(self.Table.item(i+1,1).text())
                yaw0 = float(self.Table.item(i,2).text())
                yaw1 = float(self.Table.item(i+1,2).text())
                vel0 = float(self.Table.item(i,3).text())
                vel1 = float(self.Table.item(i+1,3).text())
                if(yaw1-yaw0>math.pi):
                    yaw_minus = "True"
                else :
                    if(yaw1-yaw0 == 0):
                        yaw_minus = "equal"
                    else:
                        yaw_minus = "False"
                        
                for i in range(point):
                    t = i/point
                    vel = round((vel0+(0.5-0.5*(cos(t*pi).real))*(vel1-vel0)),3)
                    self.list_x.append(round(x0+(x1-x0)*t,3))
                    self.list_y.append(round(y0+(y1-y0)*t,3))
                    self.list_vel.append(vel)
                    if(yaw_minus == "True"):
                        if(round(yaw0+(yaw0-yaw1)*t,3)<0):
                            self.list_yaw.append(round(2*math.pi+(2*math.pi-yaw1+yaw0)*-t,3))
                        else:
                            self.list_yaw.append(round((2*math.pi-yaw1+yaw0)*t,3))
                    else:
                        if(yaw_minus == "False"):
                            if((yaw1 == 0)&(yaw0>math.pi)):yaw1 = math.pi*2
                            if(round(yaw0+(yaw1-yaw0)*t>=math.pi*2)):
                                self.list_yaw.append(round(yaw0+(yaw1-yaw0)*t-math.pi*2,3))
                            else:
                                self.list_yaw.append(round(yaw0+(yaw1-yaw0)*t,3))
                        else:#equal
                            self.list_yaw.append(yaw0)
            for i in range(self.Table.rowCount()):
                self.list_readable.append(True)
                for ii in range(point-1):
                    self.list_readable.append(False)
            self.list_x.append(round(float(self.Table.item(self.Table.rowCount()-1,0).text()),3))
            self.list_y.append(round(float(self.Table.item(self.Table.rowCount()-1,1).text()),3))
            self.list_yaw.append(round(float(self.Table.item(self.Table.rowCount()-1,2).text()),3))
            self.list_vel.append(round(float(self.Table.item(self.Table.rowCount()-1,3).text()),3))
            self.Log.append("群点数:"+str(point))
            self.Log.append("generate")
            self.Log.append('保存先：'+self.my_path)
            try:
                self.Log.append('反転保存先：'+self.my_path_mirror)
            except:
                self.Log.append('保存に失敗しました。')
            self.Log.append("---------------------------------------------------------")

    def Mirror_data(data):
        list_out = list()
        for i in range(len(data)):
            if(data[i]<5.2):
                list_out.append(data[i]+(5.2-data[i])*2)
            else:
                if(data[i]>5.2):
                    list_out.append(data[i]-(data[i]-5.2)*2)
                else:
                    list_out.append(data[i])
        return list_out