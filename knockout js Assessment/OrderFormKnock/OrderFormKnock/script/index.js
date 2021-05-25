$(document).ready(function(){

    function valid(a)
     {
        if(a==undefined ||a==""){
        return true;}
        return false;
     }
    var Cart=function()
    {
        var deatils=this;
        this.name=ko.observable();
        deatils.id=ko.observable();
     
        deatils.quantity=ko.observable();
        deatils.selected=ko.observable();
        deatils.radiovalue=ko.observable();
        deatils.checkedValue=ko.observableArray([]);
       
    }

    var product=function()
    {
        var deatils=this;
        deatils.component=[{options1:'Asus'},{options1:'oneplus'},{options1:'Mi'},{options1:'Samsung'}];
        this.row=ko.observableArray([new Cart()]);
        this.data=ko.observableArray();
        this.data1=ko.observableArray();

        this.add=function()
        {
            deatils.row.push(new Cart());

        }
      
        this.remove=function()
        {
            deatils.row.remove(this);
        }
        this.clear=function()
        {
            var element=JSON.parse(ko.toJSON(deatils.row()));
            console.log(element);
            console.log("rest");
            for(let i=0;i<deatils.row().length;i++)
            {
                deatils.row()[i].id("");
                deatils.row()[i].name("");
                deatils.row()[i].quantity("");
                deatils.row()[i].selected("");
                deatils.row()[i].radiovalue("");
                deatils.row()[i].checkedValue([]);
            }
            
            deatils.data1([]);
        }
        this.check=function(id,name,selected,radiovalue,quantity)
        {   
          
            console.log(id);
            if(valid(id)||valid(name)||valid(selected)||valid(quantity)||valid(radiovalue))
            {
                alert("FIll all the values");
                return false;
            }
            return true;
        }
        this.join=function()
        {
            deatils.data1([]);
            console.log(ko.toJSON(deatils.row()))
            var element=JSON.parse(ko.toJSON(deatils.row()));

            console.log(element.length);
             var assign=[];
            for(let i=0;i<element.length;i++)
            {
                assign[i]=true;
            }
            for(let i=0;i<element.length;i++)
            {
                
                var temp=element[i];
                console.log(element[i]);
                
                var id=temp.id;
                var name=temp.name;
                var selected=temp.selected;
                var radiovalue=temp.radiovalue;
                var quantity=temp.quantity;

                if(!deatils.check(id,name,selected,quantity,radiovalue))
                {
                    return;
                }
               
                for(let j=i+1;j<element.length;j++)
                {
                    var temp1=element[j];
                    var id1=temp1.id;
                    var name1=temp1.name;
                    var selected1=temp1.selected;
                    var quantity1=temp.quantity;
                    var radiovalue1=temp1.radiovalue;
                    if(!deatils.check(id1,name1,selected1,quantity1,radiovalue1))
                    {
                        return;
                    }
                    if(id==id1 && name==name1 && selected==selected1 && radiovalue==radiovalue1 && assign[j])
                    {
                       
                        element[i].quantity=Number(temp.quantity)+Number(temp1.quantity);
                        var a = temp.checkedValue;
                        var b = [];
                        b = temp1.checkedValue;
                      
                        var c = a.concat(b);
                      
                        if(c=="") continue;
                        element[i].checkedValue=c.filter((item, pos) => c.indexOf(item) === pos)
                        assign[j]=false;
                    }
                }
            }
            console.log("finished");
                for(let i=0;i<element.length;i++)
                {
                    console.log("in the loop");
                    if(assign[i])
                    {
                        if(element[i].checkedValue.length==0)
                        {
                           
                            element[i].checkedValue.push("NA");
                        }
                   
                       deatils.data1.push(element[i]); 
                       
                    }
                   
                }
                
            

            
           
        }
    }
    ko.applyBindings(new product());
})