# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'MainUI.ui'
#
# Created by: PyQt5 UI code generator 5.14.1
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_RouteGeneration(object):
    def setupUi(self, RouteGeneration):
        RouteGeneration.setObjectName("RouteGeneration")
        RouteGeneration.resize(1097, 639)
        self.textBrowser = QtWidgets.QTextBrowser(RouteGeneration)
        self.textBrowser.setGeometry(QtCore.QRect(230, 430, 201, 71))
        self.textBrowser.setObjectName("textBrowser")
        self.ControllPoint = QtWidgets.QGroupBox(RouteGeneration)
        self.ControllPoint.setGeometry(QtCore.QRect(460, 20, 601, 271))
        self.ControllPoint.setObjectName("ControllPoint")
        self.tableWidget = QtWidgets.QTableWidget(self.ControllPoint)
        self.tableWidget.setGeometry(QtCore.QRect(10, 40, 401, 221))
        self.tableWidget.setObjectName("tableWidget")
        self.tableWidget.setColumnCount(4)
        self.tableWidget.setRowCount(0)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(0, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(1, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(2, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(3, item)
        self.AddButton2 = QtWidgets.QPushButton(self.ControllPoint)
        self.AddButton2.setGeometry(QtCore.QRect(430, 170, 101, 25))
        self.AddButton2.setObjectName("AddButton2")
        self.DeleteButton = QtWidgets.QPushButton(self.ControllPoint)
        self.DeleteButton.setGeometry(QtCore.QRect(430, 230, 101, 25))
        self.DeleteButton.setObjectName("DeleteButton")
        self.GenerateRouteButton = QtWidgets.QPushButton(RouteGeneration)
        self.GenerateRouteButton.setGeometry(QtCore.QRect(800, 310, 261, 41))
        self.GenerateRouteButton.setObjectName("GenerateRouteButton")
        self.conditions = QtWidgets.QGroupBox(RouteGeneration)
        self.conditions.setGeometry(QtCore.QRect(450, 310, 331, 141))
        self.conditions.setObjectName("conditions")
        self.Edit_TrancelationalConvergenceError = QtWidgets.QLineEdit(self.conditions)
        self.Edit_TrancelationalConvergenceError.setGeometry(QtCore.QRect(160, 30, 111, 25))
        self.Edit_TrancelationalConvergenceError.setObjectName("Edit_TrancelationalConvergenceError")
        self.SaveButton = QtWidgets.QPushButton(self.conditions)
        self.SaveButton.setGeometry(QtCore.QRect(230, 100, 89, 25))
        self.SaveButton.setObjectName("SaveButton")
        self.label_4 = QtWidgets.QLabel(self.conditions)
        self.label_4.setGeometry(QtCore.QRect(40, 30, 91, 17))
        self.label_4.setObjectName("label_4")
        self.label_12 = QtWidgets.QLabel(self.conditions)
        self.label_12.setGeometry(QtCore.QRect(280, 30, 67, 17))
        self.label_12.setObjectName("label_12")
        self.checkBox = QtWidgets.QCheckBox(self.conditions)
        self.checkBox.setGeometry(QtCore.QRect(20, 100, 141, 23))
        self.checkBox.setObjectName("checkBox")
        self.DisplayCurvatureButton_2 = QtWidgets.QPushButton(RouteGeneration)
        self.DisplayCurvatureButton_2.setGeometry(QtCore.QRect(800, 410, 261, 41))
        self.DisplayCurvatureButton_2.setObjectName("DisplayCurvatureButton_2")
        self.groupBox = QtWidgets.QGroupBox(RouteGeneration)
        self.groupBox.setGeometry(QtCore.QRect(460, 450, 601, 171))
        self.groupBox.setObjectName("groupBox")
        self.groupBox_2 = QtWidgets.QGroupBox(self.groupBox)
        self.groupBox_2.setGeometry(QtCore.QRect(10, 30, 111, 131))
        self.groupBox_2.setObjectName("groupBox_2")
        self.groupBox_3 = QtWidgets.QGroupBox(self.groupBox_2)
        self.groupBox_3.setGeometry(QtCore.QRect(170, 0, 141, 131))
        self.groupBox_3.setObjectName("groupBox_3")
        self.RedZone = QtWidgets.QRadioButton(self.groupBox_2)
        self.RedZone.setGeometry(QtCore.QRect(10, 40, 112, 23))
        self.RedZone.setObjectName("RedZone")
        self.BlueZone = QtWidgets.QRadioButton(self.groupBox_2)
        self.BlueZone.setGeometry(QtCore.QRect(10, 90, 112, 23))
        self.BlueZone.setObjectName("BlueZone")
        self.groupBox_4 = QtWidgets.QGroupBox(self.groupBox)
        self.groupBox_4.setGeometry(QtCore.QRect(130, 30, 231, 131))
        self.groupBox_4.setObjectName("groupBox_4")
        self.shootspot1 = QtWidgets.QRadioButton(self.groupBox_4)
        self.shootspot1.setGeometry(QtCore.QRect(10, 30, 112, 23))
        self.shootspot1.setObjectName("shootspot1")
        self.shootspot2 = QtWidgets.QRadioButton(self.groupBox_4)
        self.shootspot2.setGeometry(QtCore.QRect(10, 60, 112, 23))
        self.shootspot2.setObjectName("shootspot2")
        self.shootspot3 = QtWidgets.QRadioButton(self.groupBox_4)
        self.shootspot3.setGeometry(QtCore.QRect(120, 30, 112, 23))
        self.shootspot3.setObjectName("shootspot3")
        self.shootspot4 = QtWidgets.QRadioButton(self.groupBox_4)
        self.shootspot4.setGeometry(QtCore.QRect(120, 60, 112, 23))
        self.shootspot4.setObjectName("shootspot4")
        self.shootspot5 = QtWidgets.QRadioButton(self.groupBox_4)
        self.shootspot5.setGeometry(QtCore.QRect(10, 90, 112, 23))
        self.shootspot5.setObjectName("shootspot5")
        self.groupBox_5 = QtWidgets.QGroupBox(self.groupBox)
        self.groupBox_5.setGeometry(QtCore.QRect(370, 30, 101, 131))
        self.groupBox_5.setObjectName("groupBox_5")
        self.groupBox_6 = QtWidgets.QGroupBox(self.groupBox_5)
        self.groupBox_6.setGeometry(QtCore.QRect(170, 0, 141, 131))
        self.groupBox_6.setObjectName("groupBox_6")
        self.goto_2 = QtWidgets.QRadioButton(self.groupBox_5)
        self.goto_2.setGeometry(QtCore.QRect(10, 40, 112, 23))
        self.goto_2.setObjectName("goto_2")
        self.nomal_return = QtWidgets.QRadioButton(self.groupBox_5)
        self.nomal_return.setGeometry(QtCore.QRect(10, 90, 112, 23))
        self.nomal_return.setObjectName("nomal_return")
        self.groupBox_7 = QtWidgets.QGroupBox(self.groupBox)
        self.groupBox_7.setGeometry(QtCore.QRect(480, 30, 111, 131))
        self.groupBox_7.setObjectName("groupBox_7")
        self.groupBox_8 = QtWidgets.QGroupBox(self.groupBox_7)
        self.groupBox_8.setGeometry(QtCore.QRect(170, 0, 141, 131))
        self.groupBox_8.setObjectName("groupBox_8")
        self.upper = QtWidgets.QRadioButton(self.groupBox_7)
        self.upper.setGeometry(QtCore.QRect(10, 40, 112, 23))
        self.upper.setObjectName("upper")
        self.lower = QtWidgets.QRadioButton(self.groupBox_7)
        self.lower.setGeometry(QtCore.QRect(10, 70, 112, 23))
        self.lower.setObjectName("lower")
        self.fastest = QtWidgets.QRadioButton(self.groupBox_7)
        self.fastest.setGeometry(QtCore.QRect(10, 100, 112, 23))
        self.fastest.setObjectName("fastest")
        self.verticalLayoutWidget = QtWidgets.QWidget(RouteGeneration)
        self.verticalLayoutWidget.setGeometry(QtCore.QRect(30, 30, 401, 391))
        self.verticalLayoutWidget.setObjectName("verticalLayoutWidget")
        self.verticalLayout = QtWidgets.QVBoxLayout(self.verticalLayoutWidget)
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout.setObjectName("verticalLayout")
        self.textBrowser_2 = QtWidgets.QTextBrowser(RouteGeneration)
        self.textBrowser_2.setGeometry(QtCore.QRect(30, 510, 401, 111))
        self.textBrowser_2.setObjectName("textBrowser_2")
        self.label = QtWidgets.QLabel(RouteGeneration)
        self.label.setGeometry(QtCore.QRect(30, 480, 67, 17))
        self.label.setObjectName("label")

        self.retranslateUi(RouteGeneration)
        self.AddButton2.clicked.connect(RouteGeneration.AddControlPoint)
        self.DeleteButton.clicked.connect(RouteGeneration.RemoveControlPoint)
        self.SaveButton.clicked.connect(RouteGeneration.SaveConditions)
        self.Edit_TrancelationalConvergenceError.textEdited['QString'].connect(RouteGeneration.trancelational_convergence_error)
        self.tableWidget.itemChanged['QTableWidgetItem*'].connect(RouteGeneration.edit_cell)
        self.RedZone.clicked.connect(RouteGeneration.ChangePath)
        self.BlueZone.clicked.connect(RouteGeneration.ChangePath)
        self.shootspot1.clicked.connect(RouteGeneration.ChangePath)
        self.shootspot2.clicked.connect(RouteGeneration.ChangePath)
        self.shootspot3.clicked.connect(RouteGeneration.ChangePath)
        self.shootspot4.clicked.connect(RouteGeneration.ChangePath)
        self.goto_2.clicked.connect(RouteGeneration.ChangePath)
        self.nomal_return.clicked.connect(RouteGeneration.ChangePath)
        self.lower.clicked.connect(RouteGeneration.ChangePath)
        self.upper.clicked.connect(RouteGeneration.ChangePath)
        self.GenerateRouteButton.clicked.connect(RouteGeneration.GenerateRoute)
        self.fastest.clicked.connect(RouteGeneration.ChangePath)
        self.shootspot5.clicked.connect(RouteGeneration.ChangePath)
        QtCore.QMetaObject.connectSlotsByName(RouteGeneration)

    def retranslateUi(self, RouteGeneration):
        _translate = QtCore.QCoreApplication.translate
        RouteGeneration.setWindowTitle(_translate("RouteGeneration", "Dialog"))
        self.ControllPoint.setTitle(_translate("RouteGeneration", "制御点"))
        item = self.tableWidget.horizontalHeaderItem(0)
        item.setText(_translate("RouteGeneration", "x座標(m)"))
        item = self.tableWidget.horizontalHeaderItem(1)
        item.setText(_translate("RouteGeneration", "y座標(m)"))
        item = self.tableWidget.horizontalHeaderItem(2)
        item.setText(_translate("RouteGeneration", "yaw(rad)"))
        item = self.tableWidget.horizontalHeaderItem(3)
        item.setText(_translate("RouteGeneration", "速度(m/s)"))
        self.AddButton2.setText(_translate("RouteGeneration", "追加"))
        self.DeleteButton.setText(_translate("RouteGeneration", "削除"))
        self.GenerateRouteButton.setText(_translate("RouteGeneration", "軌道生成"))
        self.conditions.setTitle(_translate("RouteGeneration", "各種条件"))
        self.SaveButton.setText(_translate("RouteGeneration", "保存"))
        self.label_4.setText(_translate("RouteGeneration", "制御点間群点数"))
        self.label_12.setText(_translate("RouteGeneration", "個"))
        self.checkBox.setText(_translate("RouteGeneration", "最適経路での生成"))
        self.DisplayCurvatureButton_2.setText(_translate("RouteGeneration", "読み込み"))
        self.groupBox.setTitle(_translate("RouteGeneration", "path"))
        self.groupBox_2.setTitle(_translate("RouteGeneration", "StartZone"))
        self.groupBox_3.setTitle(_translate("RouteGeneration", "スタートゾーン"))
        self.RedZone.setText(_translate("RouteGeneration", "RedZone"))
        self.BlueZone.setText(_translate("RouteGeneration", "BlueZone"))
        self.groupBox_4.setTitle(_translate("RouteGeneration", "ShootSpot"))
        self.shootspot1.setText(_translate("RouteGeneration", "shootsopt1"))
        self.shootspot2.setText(_translate("RouteGeneration", "shootspot2"))
        self.shootspot3.setText(_translate("RouteGeneration", "shootsopt3"))
        self.shootspot4.setText(_translate("RouteGeneration", "shootsopt4"))
        self.shootspot5.setText(_translate("RouteGeneration", "shootspot5"))
        self.groupBox_5.setTitle(_translate("RouteGeneration", "goto/return"))
        self.groupBox_6.setTitle(_translate("RouteGeneration", "スタートゾーン"))
        self.goto_2.setText(_translate("RouteGeneration", "goto"))
        self.nomal_return.setText(_translate("RouteGeneration", "return"))
        self.groupBox_7.setTitle(_translate("RouteGeneration", "upper/lower"))
        self.groupBox_8.setTitle(_translate("RouteGeneration", "スタートゾーン"))
        self.upper.setText(_translate("RouteGeneration", "upper"))
        self.lower.setText(_translate("RouteGeneration", "lower"))
        self.fastest.setText(_translate("RouteGeneration", "fastest"))
        self.label.setText(_translate("RouteGeneration", "LOG"))
