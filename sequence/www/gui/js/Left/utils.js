function DEG2RAD( deg )
{
    return Math.PI * deg / 180.0;
}

function RAD2DEG( rad )
{
    return 180.0 * rad / Math.PI;
}

function PLUSMINUS( num )
{
    if( num <  0 )
    {
        return -1;
    }
    else
    {
        return 1;
    }
}