package app;

public class Homelessness {
    
    private int lgaCode;

    private int year;

    private String status;

    private char sex;

    private String ageGroup;

    private int count;


    public Homelessness(int lgaCode, int year, String status, char sex, String ageGroup, int count) {
        this.lgaCode = lgaCode;
        this.year = year;
        this.status = status;
        this.sex = sex;
        this.ageGroup = ageGroup;
        this.count = count;
    }

    public Homelessness() {
    }

    public int getLgaCode() {
        return this.lgaCode;
    }

    public void setLgaCode(int lgaCode) {
        this.lgaCode = lgaCode;
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

    public char getSex() {
        return this.sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public String getAgeGroup() {
        return this.ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public int getCount() {
        return this.count;
    }

    public void setCount(int count) {
        this.count = count;
    }

}