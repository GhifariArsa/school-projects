package app;

public class Subtask31 extends LGAStatistics {
    
    private int totalRatio;

    private double genderRatio;

    private String sex;

    public Subtask31(int lgaCode, int year, int population, int medianIncome, int medianAge, int medianMortgage,
            int medianRent, int totalRatio, double genderRatio) {
        super(lgaCode, year, population, medianIncome, medianAge, medianMortgage, medianRent);
        this.totalRatio = totalRatio;
        this.genderRatio = genderRatio;
    }

    public Subtask31(int totalRatio, double genderRatio) {
        this.totalRatio = totalRatio;
        this.genderRatio = genderRatio;
    }

    public Subtask31() {

    }

    public int getTotalRatio() {
        return totalRatio;
    }

    public void setTotalRatio(int totalRatio) {
        this.totalRatio = totalRatio;
    }

    public double getGenderRatio() {
        return genderRatio;
    }

    public void setGenderRatio(double genderRatio) {
        this.genderRatio = genderRatio;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

   
}
