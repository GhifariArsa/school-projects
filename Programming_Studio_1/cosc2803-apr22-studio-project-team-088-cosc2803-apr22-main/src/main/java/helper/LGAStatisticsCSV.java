package helper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.util.Scanner;

import javax.imageio.plugins.tiff.ExifGPSTagSet;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class LGAStatisticsCSV {

    // Database and CSV file location
    private static final String DATABASE = "jdbc:sqlite:database/HomelessnessProject.db";
    private static final String CSV_FILE_POPULATION = "database/population-2018.csv";
    private static final String CSV_FILE_INCOME_2018 = "database/income-2018.csv";
    
    public static void main(String[] args) {
        
        insertPopulation();
        insertIncome();
        
    }

    public static void insertIncome () {
        
        // Create JDBC connection object
        Connection connection = null;

        try {
            Scanner lineScanner = new Scanner(new File(CSV_FILE_INCOME_2018));

            String header = lineScanner.nextLine();
            System.out.println("Heading row " + header + "\n");

            // Setup JDBC
            connection = DriverManager.getConnection(DATABASE);
            
            // Inserting 
            while (lineScanner.hasNext()) {
                // Always get scan by line
                String line = lineScanner.nextLine();
                
                // Create a new scanner for this line to delimit by commas (,)
                Scanner rowScanner = new Scanner(line);
                rowScanner.useDelimiter(",");

                String lgaCode = rowScanner.next();
                
                // Skips LGA Name
                String lga_name = rowScanner.next();

                String medianWeeklyIncome = rowScanner.next();

                String medianAge = rowScanner.next();

                String medianMortgage = rowScanner.next();

                String medianRent = rowScanner.next();

                int year = 2018;

                 // Prepare a new SQL Query & Set a timeout
                Statement statement = connection.createStatement();
                
                // Create Insert Statement
                String query = "UPDATE LGAStatistics " 
                    + "SET "
                    + "median_household_weekly_income = " + "'" + medianWeeklyIncome + "',"
                    + "median_age = " + "'" + medianAge + "',"
                    + "median_mortgage_repay_monthly = " + "'" + medianMortgage + "',"
                    + "median_rent_weekly = " + "'" + medianRent + "' "
                    + "WHERE lga_code = " + "'" + lgaCode + "'"
                    + "AND year = " + "'" + year + "'" 
                    ;

                // Execute the INSERT
                System.out.println("Executing: " + query);
                statement.execute(query);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void insertPopulation () {
        // Create JDBC connection object
        Connection connection = null;

        try {
            Scanner lineScanner = new Scanner(new File(CSV_FILE_POPULATION));

            String header = lineScanner.nextLine();
            System.out.println("Heading row " + header + "\n");

            // Setup JDBC
            connection = DriverManager.getConnection(DATABASE);
            
            // Inserting 
            while (lineScanner.hasNext()) {
                // Always get scan by line
                String line = lineScanner.nextLine();
                
                // Create a new scanner for this line to delimit by commas (,)
                Scanner rowScanner = new Scanner(line);
                rowScanner.useDelimiter(",");

                int year[] = {
                    2016,
                    2018
                };

                // Tracking the column
                int indexYear = 0;
                
                // Saves LgaCode
                String lgaCode = rowScanner.next();
                
                // Skips LgaName
                String lgaName = rowScanner.next();
                
                while (rowScanner.hasNext() && indexYear < year.length) {
                    String count = rowScanner.next();

                    // Prepare a new SQL Query & Set a timeout
                    Statement statement = connection.createStatement();

                    String query = "INSERT into LGAStatistics (lga_code, year, population) VALUES ("
                                + lgaCode + ","
                                + "'" + year[indexYear] + "',"
                                + "'" + count + "'"
                                + ")";

                    // Execute the INSERT
                    System.out.println("Executing: " + query);
                    statement.execute(query);

                    // Update to go to next year
                    indexYear++;

                    if (indexYear == 2) {
                        indexYear = 0;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
