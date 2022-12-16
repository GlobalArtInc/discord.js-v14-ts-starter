#!/bin/bash

if [ -z $1 ] ; then
        echo "Not env parameter example: script.sh prod dockerImage"
        exit 1
fi
if [ -z $2 ] ; then
        echo "Not repo parameter example: script.sh prod dockerImage"
        exit 1
fi


ENVNAME=$1
export ENVNAME=$1

werf converge --dev --debug --env $ENVNAME --log-verbose=true  --log-debug=true --introspect-error=true \
--repo $2 || exit 1
