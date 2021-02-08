from flask import Flask,request,render_template,abort
import json
from flask_cors import CORS,cross_origin
import time
import pymongo

app=Flask(__name__)

obj=pymongo.MongoClient()
db=obj.test


@app.route("/memes/<ide>",methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def fetch(ide):
    result=list(db.sample1.find({"id":int(ide)},{"_id":0}))
    if(result!=[]):
        return(json.dumps(result[0]))
    else:
        abort(404)
        return("There is no data with this id")

@app.route("/memes",methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def fetchall():
    result=list(db.sample1.find({},{"_id":0}))
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
    # 
    # 
    # 
    # db.sample1.insert_one({"id":ide,"name":name,"caption":caption,"url":url})
    # return("Inserted")
    


if __name__=="__main__":
    app.run(debug=True,port=8081,host='0.0.0.0')
