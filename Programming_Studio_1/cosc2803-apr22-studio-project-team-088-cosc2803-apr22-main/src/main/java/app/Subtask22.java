package app;

public class Subtask22 {

    private String sex;

    private String ageRange;

    private int count;

    private double proportion;

    private int year;


    public String getSex() {
        return this.sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAgeRange() {
        return this.ageRange;
    }

    public void setAgeRange(String ageRange) {
        this.ageRange = ageRange;
    }

    public int getCount() {
        return this.count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public double getProportion() {
        return this.proportion;
    }

    public void setProportion(double proportion) {
        this.proportion = proportion;
    }


    public Subtask22(String sex, String ageRange, int count, double proportion) {
        this.sex = sex;
        this.ageRange = ageRange;
        this.count = count;
        this.proportion = proportion;
    }


    public Subtask22() {
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getYear() {
        return this.year;
    }
}
