from cmath import pi
from itertools import count
from nis import match
from turtle import distance
from unittest import case
from matplotlib.pyplot import cla
import math

class MyFunction():

    def __init__(self):
        0
    def CatMullCurve(Time,p0,p1,p2,p3):
        m0 = float((p2 - p0)*0.5)
        m1 = float((p3-p1)*0.5)

        d = float(p1-p2)
        a = float(2.0*d+m0+m1)
        b = float(-3.0*d-2.0*m0-m1)

        return ((a*Time+b)*Time+m0)*Time+p1


    def GenerateRoute(start_x,start_y,end_x,end_y,deep_y,start_speed,middle_speed,end_speed,start_yaw,end_yaw,point_num,mode):
        # vertical=(start_y-deep_y)
        
        horizon = (start_x-end_x)
        CatMull = MyFunction.CatMullCurve
        list_x = list()
        list_y = list()
        list_speed = list()
        list_yaw = list()
        list_readable = list()
        if(mode == 2):
            #lower
            for i in range(point_num+1):
                t = i/point_num
                list_x.append(start_x)
                list_y.append(round(start_y+(deep_y-start_y)*t,3))

            for i in range(point_num+1):
                t = i/point_num
                list_x.append(round(start_x+(end_x-start_x)*t,3))
                list_y.append(deep_y)

            for i in range(point_num+1):
                t = i/point_num
                list_x.append(end_x)
                list_y.append(round(deep_y+(end_y-deep_y)*t,3))

            # 速度関係
            distance = abs(start_x-end_x)
            middle_speed = (distance/6.824)*middle_speed
            # middle_speed = (distance/6.824*0.4)*middle_speed+0.2

            list_speed = list()
            for i in range(int((point_num+1)/3)*2):
                t = i/(int((point_num+1)/3)*2)
                list_speed.append(round(start_speed+(0.4-start_speed)*t,3))
            for i in range(int((point_num+1)/3)+(point_num+1)%3):
                list_speed.append(0.4)
            for i in range(int((point_num+1)/3)):
                t = i/(int((point_num+1)/3))
                list_speed.append(round(0.4+(middle_speed-0.4)*t,3))
            for i in range(int((point_num+1)/3)+(point_num+1)%3):
                t = i/(int((point_num+1)/3)+(point_num+1)%3)
                list_speed.append(middle_speed)
            for i in range(int((point_num+1)/3)):
                t = i/(int((point_num+1)/3))
                list_speed.append(round(middle_speed+(0.4-middle_speed)*t,3))
            for i in range(int((point_num+1)/3)+(point_num+1)%3):
                list_speed.append(0.4)
            for i in range(int((point_num+1)/3)*2):
                t = i/(int((point_num+1)/3)*2)
                list_speed.append(round(0.4+(end_speed-0.4)*t,3))

            print(len(list_x))
            print(len(list_speed))

            # 姿勢角
            for i in range(point_num*3+2):
                t = i/(point_num*3+3)

                if(end_yaw == 0):
                    end_yaw = math.pi*2
                if((abs(end_yaw-start_yaw)>math.pi)):
                    if((start_yaw>math.pi)&(abs(end_yaw-start_yaw)>math.pi)):
                        yaw = start_yaw+(math.pi*2-start_yaw+end_yaw)*t
                    else:
                        # print("右回り")
                        yaw = start_yaw-(math.pi*2-(end_yaw-start_yaw))*t

                else:
                    # print("左回り")
                    yaw = start_yaw+(end_yaw-start_yaw)*t
                if(yaw >= math.pi*2):
                    yaw = yaw-math.pi*2
                if(yaw<0):
                    yaw = yaw +math.pi*2

                list_yaw.append(round(yaw,3))
            if(end_yaw == math.pi*2):
                end_yaw = 0

            
            list_yaw.append(round(end_yaw,3))

            for i in range(3):
                for i in range(point_num):
                    list_readable.append(False)
                list_readable.append(True)
            list_readable[0] = True

            return list_x,list_y,list_speed,list_yaw,list_readable
        if(mode == 0):
            #upper
            for i in range(point_num+1):
                t = i/(point_num)
                list_x.append(round(start_x+(end_x-start_x)*t,3))
                list_y.append(start_y)

            distance = abs(start_x-end_x)
            # middle_speed = (distance/6.824)*middle_speed
            middle_speed = (distance/6.824*0.4)*middle_speed+0.2

            for i in range(int((point_num+1)/3)+1):
                t = i/int((point_num+2)/3)
                list_speed.append(round(start_speed+(middle_speed-start_speed)*t,3))

            for i in range((point_num+1)-int((point_num+1)/3)*2-2):
                list_speed.append(middle_speed)
            
            for i in range(int((point_num+1)/3)+1):
                t = i/int((point_num+1)/3)
                list_speed.append(round(middle_speed+(end_speed-middle_speed)*t,3))
            list_speed.append(end_speed)


            list_readable.append(True)
            for i in range(point_num):
                t = i/(point_num)
                if(end_yaw == 0):
                    end_yaw = math.pi*2
                if((abs(end_yaw-start_yaw)>math.pi)):
                    if((start_yaw>math.pi)&(abs(end_yaw-start_yaw)>math.pi)):
                        yaw = start_yaw+(math.pi*2-start_yaw+end_yaw)*t
                    else:
                        # print("右回り")
                        yaw = start_yaw-(math.pi*2-(end_yaw-start_yaw))*t

                else:
                    # print("左回り")
                    yaw = start_yaw+(end_yaw-start_yaw)*t
                if(yaw >= math.pi*2):
                    yaw = yaw-math.pi*2
                if(yaw<0):
                    yaw = yaw +math.pi*2

                list_yaw.append(round(yaw,3))
            if(end_yaw == math.pi*2):
                end_yaw = 0
            
            list_yaw.append(round(end_yaw,3))

            for i in range(point_num-1):
                list_readable.append(False)
            list_readable.append(True)

            return list_x,list_y,list_speed,list_yaw,list_readable

        if(mode == 1):
            #fastest
            for i in range(point_num+1):
                t = i/(point_num)
                list_x.append(round(start_x+(end_x-start_x)*t,3))
                list_y.append(round(start_y+(end_y-start_y)*t,3))


            distance = abs(start_x-end_x)
            # middle_speed = (distance/6.824)*middle_speed
            middle_speed = (distance/6.824*0.4)*middle_speed+0.2

            for i in range(int((point_num+1)/3)+1):
                t = i/int((point_num+2)/3)
                list_speed.append(round(start_speed+(middle_speed-start_speed)*t,3))

            for i in range((point_num+1)-int((point_num+1)/3)*2-2):
                list_speed.append(middle_speed)
            
            for i in range(int((point_num+1)/3)+1):
                t = i/int((point_num+1)/3)
                list_speed.append(round(middle_speed+(end_speed-middle_speed)*t,3))

            list_readable.append(True)
            for i in range(point_num):
                t = i/(point_num)
                if(end_yaw == 0):
                    end_yaw = math.pi*2
                if((abs(end_yaw-start_yaw)>math.pi)):
                    if((start_yaw>math.pi)&(abs(end_yaw-start_yaw)>math.pi)):
                        yaw = start_yaw+(math.pi*2-start_yaw+end_yaw)*t
                    else:
                        # print("右回り")
                        yaw = start_yaw-(math.pi*2-(end_yaw-start_yaw))*t

                else:
                    # print("左回り")
                    yaw = start_yaw+(end_yaw-start_yaw)*t
                if(yaw >= math.pi*2):
                    yaw = yaw-math.pi*2
                if(yaw<0):
                    yaw = yaw +math.pi*2

                list_yaw.append(round(yaw,3))
            if(end_yaw == math.pi*2):
                end_yaw = 0
            
            list_yaw.append(round(end_yaw,3))

            for i in range(point_num-1):
                list_readable.append(False)
            list_readable.append(True)

            return list_x,list_y,list_speed,list_yaw,list_readable
