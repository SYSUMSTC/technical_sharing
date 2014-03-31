#!/bin/bash

OPTIONS="Hello Quit"
select opt in $OPTIONS;
do
    if [ "$opt" = "Quit" ]; then
        exit 0
    elif [ "$opt" = "Hello" ]; then
        echo Hello World
    else
        echo 'bad option'
    fi
done

exit 0
