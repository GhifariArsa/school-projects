package app;

public class LGAStatistics {
    
    private int lgaCode;
    
    private int year;

    private int population;

    private int medianIncome;

    private int medianAge;

    private int medianMortgage;

    private int medianRent;

    private String lgaName;

    private String lgaType;

    private String state;

    private int area;


    public LGAStatistics(int lgaCode, int year, int population, int medianIncome, int medianAge, int medianMortgage, int medianRent) {
        this.lgaCode = lgaCode;
        this.year = year;
        this.population = population;
        this.medianIncome = medianIncome;
        this.medianAge = medianAge;
        this.medianMortgage = medianMortgage;
        this.medianRent = medianRent;
    }


    public LGAStatistics() {
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

    public int getPopulation() {
        return this.population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    public int getMedianIncome() {
        return this.medianIncome;
    }

    public void setMedianIncome(int medianIncome) {
        this.medianIncome = medianIncome;
    }

    public int getMedianAge() {
        return this.medianAge;
    }

    public void setMedianAge(int medianAge) {
        this.medianAge = medianAge;
    }

    public int getMedianMortgage() {
        return this.medianMortgage;
    }

    public void setMedianMortgage(int medianMortgage) {
        this.medianMortgage = medianMortgage;
    }

    public int getMedianRent() {
        return this.medianRent;
    }

    public void setMedianRent(int medianRent) {
        this.medianRent = medianRent;
    }

    public void setLGAName(String lgaName) {
        this.lgaName = lgaName;
    }

    public String getLGAName() {
        return this.lgaName;
    }

    public void setLGAType(String lgaType) {
        this.lgaType = lgaType;
    }

    public String getLGAType() {
        return lgaType;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return this.state;
    }

    public void setArea(int area) {
        this.area = area;
    }

    public int getArea() {
        return this.area;
    }

}
