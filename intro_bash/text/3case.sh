#!/bin/bash
#case

read var
case "$var" in 
    1)
        echo 1
    ;;
    2)
        echo 2
    ;;
    *)
        echo other
    ;;
esac
