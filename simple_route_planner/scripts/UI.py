# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'MainUI.ui'
#
# Created by: PyQt5 UI code generator 5.14.1
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_Dialog(object):
    def setupUi(self, Dialog):
        Dialog.setObjectName("Dialog")
        Dialog.resize(870, 597)
        self.verticalLayoutWidget = QtWidgets.QWidget(Dialog)
        self.verticalLayoutWidget.setGeometry(QtCore.QRect(9, 50, 501, 481))
        self.verticalLayoutWidget.setObjectName("verticalLayoutWidget")
        self.verticalLayout = QtWidgets.QVBoxLayout(self.verticalLayoutWidget)
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout.setObjectName("verticalLayout")
        self.groupe_box = QtWidgets.QGroupBox(Dialog)
        self.groupe_box.setGeometry(QtCore.QRect(540, 130, 311, 401))
        self.groupe_box.setObjectName("groupe_box")
        self.label_2 = QtWidgets.QLabel(self.groupe_box)
        self.label_2.setGeometry(QtCore.QRect(0, 130, 91, 17))
        self.label_2.setObjectName("label_2")
        self.end_x = QtWidgets.QLineEdit(self.groupe_box)
        self.end_x.setGeometry(QtCore.QRect(80, 80, 61, 25))
        self.end_x.setObjectName("end_x")
        self.label = QtWidgets.QLabel(self.groupe_box)
        self.label.setGeometry(QtCore.QRect(10, 80, 67, 17))
        self.label.setObjectName("label")
        self.deep_y = QtWidgets.QLineEdit(self.groupe_box)
        self.deep_y.setGeometry(QtCore.QRect(80, 130, 61, 25))
        self.deep_y.setObjectName("deep_y")
        self.label_3 = QtWidgets.QLabel(self.groupe_box)
        self.label_3.setGeometry(QtCore.QRect(10, 180, 67, 17))
        self.label_3.setObjectName("label_3")
        self.start_speed = QtWidgets.QLineEdit(self.groupe_box)
        self.start_speed.setGeometry(QtCore.QRect(80, 180, 61, 25))
        self.start_speed.setObjectName("start_speed")
        self.label_4 = QtWidgets.QLabel(self.groupe_box)
        self.label_4.setGeometry(QtCore.QRect(170, 280, 61, 17))
        self.label_4.setObjectName("label_4")
        self.point = QtWidgets.QLineEdit(self.groupe_box)
        self.point.setGeometry(QtCore.QRect(240, 280, 61, 25))
        self.point.setObjectName("point")
        self.label_5 = QtWidgets.QLabel(self.groupe_box)
        self.label_5.setGeometry(QtCore.QRect(10, 30, 67, 17))
        self.label_5.setObjectName("label_5")
        self.label_6 = QtWidgets.QLabel(self.groupe_box)
        self.label_6.setGeometry(QtCore.QRect(170, 30, 67, 17))
        self.label_6.setObjectName("label_6")
        self.start_x = QtWidgets.QLineEdit(self.groupe_box)
        self.start_x.setGeometry(QtCore.QRect(80, 30, 61, 25))
        self.start_x.setObjectName("start_x")
        self.start_y = QtWidgets.QLineEdit(self.groupe_box)
        self.start_y.setGeometry(QtCore.QRect(240, 30, 61, 25))
        self.start_y.setObjectName("start_y")
        self.label_7 = QtWidgets.QLabel(self.groupe_box)
        self.label_7.setGeometry(QtCore.QRect(170, 180, 67, 17))
        self.label_7.setObjectName("label_7")
        self.middle_speed = QtWidgets.QLineEdit(self.groupe_box)
        self.middle_speed.setGeometry(QtCore.QRect(240, 180, 61, 25))
        self.middle_speed.setObjectName("middle_speed")
        self.label_19 = QtWidgets.QLabel(self.groupe_box)
        self.label_19.setGeometry(QtCore.QRect(170, 230, 67, 17))
        self.label_19.setObjectName("label_19")
        self.generate = QtWidgets.QPushButton(self.groupe_box)
        self.generate.setGeometry(QtCore.QRect(20, 330, 111, 41))
        self.generate.setObjectName("generate")
        self.save = QtWidgets.QPushButton(self.groupe_box)
        self.save.setGeometry(QtCore.QRect(190, 330, 111, 41))
        self.save.setObjectName("save")
        self.end_speed = QtWidgets.QLineEdit(self.groupe_box)
        self.end_speed.setGeometry(QtCore.QRect(80, 230, 61, 25))
        self.end_speed.setObjectName("end_speed")
        self.label_18 = QtWidgets.QLabel(self.groupe_box)
        self.label_18.setGeometry(QtCore.QRect(10, 230, 67, 17))
        self.label_18.setObjectName("label_18")
        self.start_yaw = QtWidgets.QLineEdit(self.groupe_box)
        self.start_yaw.setGeometry(QtCore.QRect(240, 230, 61, 25))
        self.start_yaw.setObjectName("start_yaw")
        self.end_yaw = QtWidgets.QLineEdit(self.groupe_box)
        self.end_yaw.setGeometry(QtCore.QRect(80, 280, 61, 25))
        self.end_yaw.setObjectName("end_yaw")
        self.label_17 = QtWidgets.QLabel(self.groupe_box)
        self.label_17.setGeometry(QtCore.QRect(10, 280, 67, 17))
        self.label_17.setObjectName("label_17")
        self.end_y = QtWidgets.QLineEdit(self.groupe_box)
        self.end_y.setGeometry(QtCore.QRect(240, 80, 61, 25))
        self.end_y.setObjectName("end_y")
        self.label_8 = QtWidgets.QLabel(self.groupe_box)
        self.label_8.setGeometry(QtCore.QRect(170, 80, 71, 17))
        self.label_8.setObjectName("label_8")
        self.lineEdit_3 = QtWidgets.QLineEdit(Dialog)
        self.lineEdit_3.setGeometry(QtCore.QRect(1330, 360, 61, 25))
        self.lineEdit_3.setObjectName("lineEdit_3")
        self.groupBox = QtWidgets.QGroupBox(Dialog)
        self.groupBox.setGeometry(QtCore.QRect(540, 50, 311, 71))
        self.groupBox.setObjectName("groupBox")
        self.upper = QtWidgets.QRadioButton(self.groupBox)
        self.upper.setGeometry(QtCore.QRect(10, 30, 112, 23))
        self.upper.setObjectName("upper")
        self.fastest = QtWidgets.QRadioButton(self.groupBox)
        self.fastest.setGeometry(QtCore.QRect(230, 30, 112, 23))
        self.fastest.setObjectName("fastest")
        self.lower = QtWidgets.QRadioButton(self.groupBox)
        self.lower.setGeometry(QtCore.QRect(120, 30, 112, 23))
        self.lower.setObjectName("lower")

        self.retranslateUi(Dialog)
        self.generate.clicked.connect(Dialog.Generate)
        self.save.clicked.connect(Dialog.Save)
        QtCore.QMetaObject.connectSlotsByName(Dialog)
        Dialog.setTabOrder(self.upper, self.lower)
        Dialog.setTabOrder(self.lower, self.fastest)
        Dialog.setTabOrder(self.fastest, self.start_x)
        Dialog.setTabOrder(self.start_x, self.start_y)
        Dialog.setTabOrder(self.start_y, self.end_x)
        Dialog.setTabOrder(self.end_x, self.end_y)
        Dialog.setTabOrder(self.end_y, self.deep_y)
        Dialog.setTabOrder(self.deep_y, self.start_speed)
        Dialog.setTabOrder(self.start_speed, self.middle_speed)
        Dialog.setTabOrder(self.middle_speed, self.end_speed)
        Dialog.setTabOrder(self.end_speed, self.start_yaw)
        Dialog.setTabOrder(self.start_yaw, self.end_yaw)
        Dialog.setTabOrder(self.end_yaw, self.point)
        Dialog.setTabOrder(self.point, self.generate)
        Dialog.setTabOrder(self.generate, self.save)
        Dialog.setTabOrder(self.save, self.lineEdit_3)

    def retranslateUi(self, Dialog):
        _translate = QtCore.QCoreApplication.translate
        Dialog.setWindowTitle(_translate("Dialog", "Dialog"))
        self.groupe_box.setTitle(_translate("Dialog", "パラメータ"))
        self.label_2.setText(_translate("Dialog", "通過地点(ｙ)"))
        self.label.setText(_translate("Dialog", "終点(x)"))
        self.label_3.setText(_translate("Dialog", "初速度"))
        self.label_4.setText(_translate("Dialog", "群点数"))
        self.label_5.setText(_translate("Dialog", "始点(ｘ)"))
        self.label_6.setText(_translate("Dialog", "始点(ｙ)"))
        self.label_7.setText(_translate("Dialog", "中間速度"))
        self.label_19.setText(_translate("Dialog", "初姿勢角"))
        self.generate.setText(_translate("Dialog", "生成"))
        self.save.setText(_translate("Dialog", "保存"))
        self.label_18.setText(_translate("Dialog", "終速度"))
        self.label_17.setText(_translate("Dialog", "終姿勢角"))
        self.label_8.setText(_translate("Dialog", "終点(ｙ)"))
        self.groupBox.setTitle(_translate("Dialog", "経路"))
        self.upper.setText(_translate("Dialog", "upper"))
        self.fastest.setText(_translate("Dialog", "fastest"))
        self.lower.setText(_translate("Dialog", "lower"))
