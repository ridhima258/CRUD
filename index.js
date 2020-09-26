const axios=require('axios');
const fs=require('fs');
const {to}=require('await-to-js');
var dateFormat = require('dateformat');


async function getAllEvents()
{
    //console.log("function");
    let res,err;

    [err,res]= await to(axios.get('https://clist.by/get/events/'));
    if(err)
    {
        console.log("error");
    }
    console.log(res.data[0].id);
    fs.writeFile('events.json',JSON.stringify(res.data), function(err){});
}

async function pastEvents()
{
    await to(fs.open('events.json',function(err,res){
        if(err)
            console.log('err');
        else
        console.log("opened file");
        fs.readFile('events.json', function(err,res){
            if(err)
                console.log(err);
            let data=JSON.parse(res);
            var now = new Date();
            let today=dateFormat(now, "isoDateTime");
            for(let i=0;i<data.length;i++)
            {
                if(data[i].end < today)
                {
                    console.log(data[i]);
                }
            }
        });
    }));    
}
async function upcomingEvents()
{
    await to(fs.open('events.json',function(err,res){
        if(err)
            console.log('err');
        else
        console.log("opened file");
        fs.readFile('events.json', function(err,res){
            if(err)
                console.log(err);
            let data=JSON.parse(res);
            var now = new Date();
            let today=dateFormat(now, "isoDateTime");
            for(let i=0;i<data.length;i++)
            {
                if(data[i].start > today)
                {
                    console.log(data[i]);
                }
            }
        });
    }));    
}

async function runningEvents()
{
    await to(fs.open('events.json',function(err,res){
        if(err)
            console.log('err');
        else
        console.log("opened file");
        fs.readFile('events.json', function(err,res){
            if(err)
                console.log(err);
            let data=JSON.parse(res);
            var now = new Date();
            let today=dateFormat(now, "isoDateTime");
            for(let i=0;i<data.length;i++)
            {
                if(data[i].start < today && data[i].end > today)
                {
                    console.log(data[i]);
                }
            }
        });
    }));    
}

async function main()
{
    var demand=process.argv[2];
    await to(getAllEvents());
    console.log("start");
    if(demand==='past')
    {
        await to(pastEvents());
    }else if(demand==='upcoming')
    {
        await to(upcomingEvents());
    }
    else if(demand==='running')
    {
        await to(runningEvents());
    }
    console.log("end");
}
main();
