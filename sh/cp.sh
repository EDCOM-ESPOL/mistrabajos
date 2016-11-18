#!/bin/bash

# src=$1
# dest=$2


if mv $1 $2
then
   echo "$? - Successful"
else
   echo "$? - Unsuccessful"
fi