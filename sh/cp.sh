#!/bin/bash

# src=$1
# dest=$2

cp -r $1 $2

sudo -u www-data php occ files:scan --path= $2

echo 'Hello'