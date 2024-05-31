package app;

public class Subtask32 {

    private String lgaName;

    private int changeInHomeless;

    private double changeInHomelessPercent;

    private int changeInAtrisk;

    private double changeInAtRiskPercent;

    private int totalChangeInPopulation;

    private double totalChangeInPopulationPercent;

    private double ratio;

    public Subtask32(String lgaName, int changeInHomeless, double changeInHomelessPercent, int changeInAtrisk,
            double changeInAtRiskPercent, double ratio) {
        this.lgaName = lgaName;
        this.changeInHomeless = changeInHomeless;
        this.changeInHomelessPercent = changeInHomelessPercent;
        this.changeInAtrisk = changeInAtrisk;
        this.changeInAtRiskPercent = changeInAtRiskPercent;
        this.ratio = ratio;
    }

    public String getLgaName() {
        return lgaName;
    }

    public void setLgaName(String lgaName) {
        this.lgaName = lgaName;
    }

    public int getChangeInHomeless() {
        return changeInHomeless;
    }

    public void setChangeInHomeless(int changeInHomeless) {
        this.changeInHomeless = changeInHomeless;
    }

    public double getChangeInHomelessPercent() {
        return changeInHomelessPercent;
    }

    public void setChangeInHomelessPercent(double changeInHomelessPercent) {
        this.changeInHomelessPercent = changeInHomelessPercent;
    }

    public int getChangeInAtrisk() {
        return changeInAtrisk;
    }

    public void setChangeInAtrisk(int changeInAtrisk) {
        this.changeInAtrisk = changeInAtrisk;
    }

    public double getChangeInAtRiskPercent() {
        return changeInAtRiskPercent;
    }

    public void setChangeInAtRiskPercent(double changeInAtRiskPercent) {
        this.changeInAtRiskPercent = changeInAtRiskPercent;
    }

    public double getRatio() {
        return ratio;
    }

    public void setRatio(double ratio) {
        this.ratio = ratio;
    }

    public int getTotalChangeInPopulation() {
        return totalChangeInPopulation;
    }

    public void setTotalChangeInPopulation(int totalChangeInPopulation) {
        this.totalChangeInPopulation = totalChangeInPopulation;
    }

    public double getTotalChangeInPopulationPercent() {
        return totalChangeInPopulationPercent;
    }

    public void setTotalChangeInPopulationPercent(double totalChangeInPopulationPercent) {
        this.totalChangeInPopulationPercent = totalChangeInPopulationPercent;
    }

    public Subtask32(String lgaName, int changeInHomeless, double changeInHomelessPercent, int changeInAtrisk,
            double changeInAtRiskPercent, int totalChangeInPopulation, double totalChangeInPopulationPercent,
            double ratio) {
        this.lgaName = lgaName;
        this.changeInHomeless = changeInHomeless;
        this.changeInHomelessPercent = changeInHomelessPercent;
        this.changeInAtrisk = changeInAtrisk;
        this.changeInAtRiskPercent = changeInAtRiskPercent;
        this.totalChangeInPopulation = totalChangeInPopulation;
        this.totalChangeInPopulationPercent = totalChangeInPopulationPercent;
        this.ratio = ratio;
    }

    public Subtask32() {
        
    }

}
