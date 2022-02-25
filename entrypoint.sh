#!/bin/sh

find .next -type f -print0 | xargs -0 sed -i "s#API_URL_PLACEHOLDER#$NEXT_PUBLIC_API_URL#g"

npm run start
