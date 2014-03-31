#!/bin/bash
#add 1 to x

x=0
let "x = $x + 1"    # x=2
y=`expr $x + 1`   # y=3
z=$(($y + 1))     # z=4
echo $z

exit 0
