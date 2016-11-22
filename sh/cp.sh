#!/bin/bash

if cp -R $1 $2
then
	rm -r $1
	echo "Successful"

else
   echo "Unsuccessful"
fi
