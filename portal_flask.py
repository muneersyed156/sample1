from flask import Flask,request,render_template,abort,Response
import json
from flask_cors import CORS,cross_origin
import time
import pymongo

app=Flask(__name__)

obj=pymongo.MongoClient()
db=obj.test

#https://github.com/muneersyed156/sample1.git

@app.route("/memes/<ide>",methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def fetch(ide):
    result=list(db.sample1.find({"id":int(ide)},{"_id":0}))
    if(result!=[]):
        return(json.dumps(result[0]))
    else:
        abort(404)
        return("There is no data with this id")

@app.route("/memes/<ide>",methods=["PATCH"])
@cross_origin(origin="*",headers=['content-Type','Authorization'])
def edit_content(ide):
    result=list(db.sample1.find({"id":int(ide)},{"_id":0}))
    if(result!=[]):
        data=json.loads(request.data)
        url=data['url'];caption=data['caption']
        #return(caption+" "+url)
        result=db.sample1.update_one({"id":int(ide)},{"$set":{"caption":caption,"url":url}})
        #return(str(result))
        status_code = Response(status=200)
        return(status_code)#Return this status
    else:
        abort(404,"This id doesn't exist")

@app.route("/memes",methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def fetchall():
    result=list(db.sample1.find({},{"_id":0,"time":0}).sort([("id",-1)]).limit(100))
    result=result[::-1]
    return(json.dumps(result))

@app.route("/memes",methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def memes():
    if(request.data):
        data=json.loads(request.data)
        name=data['name']
        url=data['url']
        caption=data['caption']
    if(request.form):
        data=request.form
        name=data["name"];caption=data["caption"];url=data["url"]
    test_duplicate=list(db.sample1.find({"name":name,"caption" : caption,"url" : url}))
    if(test_duplicate==[]):
        k=db.sample1.count()
        ide=k+1
        time_stamp=str(time.ctime())
        db.sample1.insert_one({"id":ide,"name":name,"caption":caption,"url":url,"time":time_stamp})
        return(json.dumps({"id":ide}))
    else:
        abort(409,"This data already exists")
        return


if __name__=="__main__":
    app.run(debug=True,port=8081,host='0.0.0.0')

