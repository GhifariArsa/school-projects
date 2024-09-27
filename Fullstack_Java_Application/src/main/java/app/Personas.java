package app;

public class Personas{
    private String name;
    private String attributeType;
    private String description;

    
    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public void setAttributeType(String attributeType){
        this.attributeType = attributeType;
    }

    public String getAttributeType(){
        return this.attributeType;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getDescription(){
        return this.description;
    }
}