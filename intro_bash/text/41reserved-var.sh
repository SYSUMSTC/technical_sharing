#!/bin/bash
# compare * @

echo \"\$*\"
for i in "$*"
do
    echo $i
done

echo \"\$@\"
for i in "$@"
do
    echo $i
done

#echo \$*
#for i in $*
#do
#    echo $i
#done

#echo \$@
#for i in $@
#do
#    echo $i
#done

#echo $@
#echo $*
