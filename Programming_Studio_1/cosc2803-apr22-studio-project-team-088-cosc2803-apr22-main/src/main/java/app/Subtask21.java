package app;

public class Subtask21 {
    
    private int lgaCode;

    private String lgaName;

    private int year;

    private String status;

    private String sex;

    private String ageGroup;

    private int count;

    private double proportion;


    public Subtask21(int lgaCodel, int year, String status, String sex, int count, String ageGroup, String lgaName) {
        this.lgaCode = lgaCodel;
        this.year = year;
        this.status = status;
        this.sex = sex;
        this.count = count;
        this.ageGroup = ageGroup;
        this.lgaName = lgaName;
    }


    public Subtask21() {
    }


    public int getLgaCode() {
        return this.lgaCode;
    }

    public void setLgaCode(int lgaCodel) {
        this.lgaCode = lgaCodel;
    }

    public int getYear() {
        return this.year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSex() {
        return this.sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getCount() {
        return this.count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getAgeGroup() {
        return this.ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public String getLGAName() {
        return this.lgaName;
    }

    public void setLGAName(String lgaName) {
        this.lgaName = lgaName;
    }

    public void setProportion(double proportion) {
        this.proportion = proportion;
    }

    public double getProportion() {
        return this.proportion;
    }

}
