const TargetSpotNum = 10;
const MechNum = 5;
const SpotNum = 5;

var Talker;

const TargetSpotIndex = 
{
    0 : 'Sa1',
    1 : 'Sa2',
    2 : 'Sa3',
    3 : 'Sb1',
    4 : 'Sb2',
    5 : 'S_K1',
    6 : 'S_K2',
    7 : 'Ba_right',
    8 : 'Ba_left',
    9 : 'Bb'
}

var ROSParam = new ROSParameters();

const ItemIndex = 
{
    0 : 'SteeringDev',
    1 : 'velocity',
    2 : 'ElevationAngle'
};

if(!Talker){
    
        Talker = {
        ros : null,
        name : "",
        init : function(){

            this.ros = new ROSLIB.Ros();

            this.ros.connect('ws://' + location.hostname + ':9090');
            
            this.ros.on('error', function(error) {
                document.getElementById('rosbridge_status').innerHTML = "Error";
            });
            this.ros.on('connection', function(error) {
                document.getElementById('rosbridge_status').innerHTML = "Connect";
            });
            this.ros.on('close', function(error) {
                document.getElementById('rosbridge_status').innerHTML = "Close";
            });

    
        },

		Update : function()
		{
            var shoot_spot = document.selection.ShootSpot.options[ document.selection.ShootSpot.selectedIndex ].value;

			for( let i = 0; i < MechNum; i++ )
			{
                for( let k = 0; k < TargetSpotNum; k++ )
                {
                    var SteeringDevParam = new ROSLIB.Param({
                        ros : this.ros,
                        name : '/shoot_spot_node/DynamicShootParam' + shoot_spot + '/M' + i + '/' + TargetSpotIndex[ k ] + '/SteeringDev' 
                    })

                    SteeringDevParam.get
                    (
                        function( param )
                        {
                            ROSParam[ 's' + shoot_spot ][ 'M' + i ][ TargetSpotIndex[ k ] ][ 'SteeringDev' ] = RAD2DEG( param );
                        }
                    );


                    var VelocityParam = new ROSLIB.Param({
                        ros : this.ros,
                        name : '/shoot_spot_node/DynamicShootParam' + shoot_spot + '/M' + i + '/' + TargetSpotIndex[ k ] + '/velocity' 
                    })

                    VelocityParam.get
                    (
                        function( param )
                        {
                            
                            ROSParam[ 's' + shoot_spot ][ 'M' + i ][ TargetSpotIndex[ k ] ][ 'velocity' ] = param;
                        }
                    );


                    var ElevationAngleParam = new ROSLIB.Param({
                        ros : this.ros,
                        name : '/shoot_spot_node/DynamicShootParam' + shoot_spot + '/M' + i + '/' + TargetSpotIndex[ k ] + '/ElevationAngle' 
                    })

                    ElevationAngleParam.get
                    (
                        function( param )
                        {
                            ROSParam[ 's' + shoot_spot ][ 'M' + i ][ TargetSpotIndex[ k ] ][ 'ElevationAngle' ] = RAD2DEG( param );
                        }
                    );
                }
			}

            setTimeout
            (
                function()
                {
                    Talker.Display();
                },
                2000
            );
		},

        Display : function()
        {
            // var S = document.ShootSpot.selectedIndex + 1;
            var ShootSpot = document.selection.ShootSpot.options[ document.selection.ShootSpot.selectedIndex ].value;

            var Tables =
            {
                M0 : document.getElementById( 'M0' ),
                M1 : document.getElementById( 'M1' ),
                M2 : document.getElementById( 'M2' ),
            };

            for( let i = 0; i < 3; i++ )
            {
                for( let j = 0; j < 3; j++ )
                {
                    for( let k = 0; k < 10; k++ )
                    {
                        Tables[ 'M' + i ].rows[ k + 1 ].cells[ j + 1 ].firstElementChild.value = Math.floor((ROSParam[ 's' + ShootSpot ][ 'M' + i ][ TargetSpotIndex[ k ] ][ ItemIndex[ j ] ])*100)/100;
                    }   
                }
            }
        },

        /**
         * 
         * @param {*} MecNum 
         * @param {*} ShootSpot 
         * @param {*} TargetSpot 
         * @param {*} value 
         * @param {string} ParamType ElevationAngle or velocity or SteeringDev
         */
        ChangeData: function( MecNum,ShootSpot,TargetSpot,value, ParamType )
        {
            console.log(MecNum)
            console.log(ShootSpot)
            console.log(TargetSpot)
            console.log(value);
    
            var Param = new ROSLIB.Param({
                ros : this.ros,
                name : '/shoot_spot_node/DynamicShootParam' + ShootSpot + '/' + MecNum + '/' + TargetSpot + '/' + ParamType
            })

            value = parseFloat( value );

            if( ParamType == 'ElevationAngle' || ParamType == 'SteeringDev' )
            {
                value = DEG2RAD( value );
            }

            Param.set( parseFloat( value ) );
        }
    
    
    }
    Talker.init();

    // window.onload = function(){
    // };
    window.onunload = function(){
        Talker.ros.close();
    };
}

function RAD2DEG( param )
{
    var test = ( param / Math.PI ) * 180.0;
    return test;
}


function DEG2RAD( param )
{
    var test = ( param / 180.0 ) * Math.PI;
    return test;
}