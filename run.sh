parsedVersion=$(echo "${version//./}")
if [[ "$parsedVersion" -lt "300" ]]
then 
    python server/py2_server.py
else
    python3 server/py3_server.py
fi