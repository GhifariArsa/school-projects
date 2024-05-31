package app;

import java.util.ArrayList;

import javax.print.attribute.standard.DialogTypeSelection;

import kotlin.coroutines.jvm.internal.RestrictedSuspendLambda;

import java.sql.Connection;
import java.sql.DriverAction;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Class for Managing the JDBC Connection to a SQLLite Database.
 * Allows SQL queries to be used with the SQLLite Databse in Java.
 *
 * @author Timothy Wiley, 2022. email: timothy.wiley@rmit.edu.au
 * @author Santha Sumanasekara, 2021. email: santha.sumanasekara@rmit.edu.au
 */
public class JDBCConnection {

    // Name of database file (contained in database folder)
    // private static final String DATABASE = "jdbc:sqlite:database/ctg.db";

    // If you are using the Homelessness data set replace this with the below
    private static final String DATABASE = "jdbc:sqlite:database/HomelessnessProject.db";

    /**
     * This creates a JDBC Object so we can keep talking to the database
     */
    public JDBCConnection() {
        System.out.println("Created JDBC Connection Object");
    }

    /**
     * Get all of the LGAs in the database.
     * 
     * @return
     *         Returns an ArrayList of LGA objects
     */
    public ArrayList<LGA> getLGAs() {
        // Create the ArrayList of LGA objects to return
        ArrayList<LGA> lgas = new ArrayList<LGA>();

        // Setup the variable for the JDBC connection
        Connection connection = null;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // The Query
            String query = "SELECT * FROM LGA";

            // Get Result
            ResultSet results = statement.executeQuery(query);

            // Process all of the results
            while (results.next()) {
                // Lookup the columns we need
                int code16 = results.getInt("lga_code");
                String name16 = results.getString("lga_name");
                String lgaType = results.getString("lga_type");
                double area = results.getDouble("area_sqkm");
                double latitude = results.getDouble("latitude");
                double longitude = results.getDouble("longitude");

                // Create a LGA Object
                LGA lga = new LGA(code16, name16, lgaType, area, latitude, longitude);

                // Add the lga object to the array
                lgas.add(lga);
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        // Finally we return all of the lga
        return lgas;
    }

    public ArrayList<LGA> getLGAOnState(String state) {

        ArrayList<LGA> lgas = new ArrayList<LGA>();

        // Create Connection
        Connection connection = null;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            String query = "SELECT * FROM lga WHERE lga_code >= 10000 AND lga_code < 20000";

            // Switch statement for query
            switch (state) {
                case "NSW":
                    query = "SELECT * FROM lga WHERE lga_code >= 10000 AND lga_code < 20000";
                    break;
                case "Victoria":
                    query = "SELECT * FROM lga WHERE lga_code >= 20000 AND lga_code < 30000";
                    break;
                case "Queensland":
                    query = "SELECT * FROM lga WHERE lga_code >= 30000 AND lga_code < 40000";
                    break;
                case "South Australia":
                    query = "SELECT * FROM lga WHERE lga_code >= 40000 AND lga_code < 50000";
                    break;
                case "Western Australia":
                    query = "SELECT * FROM lga WHERE lga_code >= 50000 AND lga_code < 60000";
                    break;
                case "Tasmania":
                    query = "SELECT * FROM lga WHERE lga_code >= 60000 AND lga_code < 70000";
                    break;
                case "Northern Territory":
                    query = "SELECT * FROM lga WHERE lga_code >= 70000 AND lga_code < 80000";
                    break;
                case "ACT":
                    query = "SELECT * FROM lga WHERE lga_code >= 80000 AND lga_code < 90000";
                    break;
                case "Other":
                    query = "SELECT * FROM lga WHERE lga_code >= 90000";
                    break;
                default:
                    query = "SELECT * FROM LGA";
                    break;
            }

            // Get Result
            ResultSet results = statement.executeQuery(query);

            // Process all of the results
            while (results.next()) {
                // Lookup the columns we need
                int code16 = results.getInt("lga_code");
                String name16 = results.getString("lga_name");
                String lgaType = results.getString("lga_type");
                double area = results.getDouble("area_sqkm");
                double latitude = results.getDouble("latitude");
                double longitude = results.getDouble("longitude");

                // Create a LGA Object
                LGA lga = new LGA(code16, name16, lgaType, area, latitude, longitude);

                // Add the lga object to the array
                lgas.add(lga);
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }
        return lgas;
    }

    public ArrayList<Subtask21> subtask21query(String lga, String ageRange, String sex, String status) {

        ArrayList<Subtask21> lists = new ArrayList<Subtask21>();

        Connection connection = null;

        try {
            // Create connection to the database
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            String query = "SELECT h.lga_code, lga_name, year, status, sex, age_group, count FROM HomelessGroup h JOIN LGA l ON l.lga_code = h.lga_code WHERE l.lga_code = "
                    + "'" + lga + "'" + " AND sex = " + "'" + sex + "'" + " AND age_group = " + "'" + ageRange + "'"
                    + " AND status = " + "'" + status + "'";
            System.out.println(query);

            // Get Result
            ResultSet results = statement.executeQuery(query);

            while (results.next()) {
                int lgaResult = results.getInt("lga_code");
                int yearResult = results.getInt("year");
                String sexResult = results.getString("sex");
                String ageResult = results.getString("age_group");
                String statusResult = results.getString("status");
                int countResult = results.getInt("count");
                String lgaName = results.getString("lga_name");

                sexResult = changeDatabaseSexToNormalSex(sexResult);

                Subtask21 subtask = new Subtask21(lgaResult, yearResult, statusResult, sexResult, countResult,
                        ageResult, lgaName);
                lists.add(subtask);
            }

        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }
        return lists;
    }

    public ArrayList<LGAStatistics> getLGAFromCode(int code) {
        ArrayList<LGAStatistics> lgas = new ArrayList<LGAStatistics>();

        // Create Connection
        Connection connection = null;

        try {
            // Create connection to the database
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            String query = "SELECT * FROM LGAstatistics JOIN lga ON lga.lga_code = lgaStatistics.lga_code WHERE lga.lga_code = "
                    + "'" + code + "'" + " GROUP BY lga.lga_code";
            System.out.println(query);

            // Get Result
            ResultSet results = statement.executeQuery(query);

            while (results.next()) {
                LGAStatistics stat = new LGAStatistics();

                int lgaCode = results.getInt("lga_code");
                String name = results.getString("lga_name");
                String state = "";
                if (lgaCode >= 10000 && lgaCode < 20000) {
                    state = "NSW";
                }
                if (lgaCode >= 20000 && lgaCode < 30000) {
                    state = "Victoria";
                }
                if (lgaCode >= 30000 && lgaCode < 40000) {
                    state = "Queensland";
                }
                if (lgaCode >= 40000 && lgaCode < 50000) {
                    state = "South Australia";
                }
                if (lgaCode >= 50000 && lgaCode < 60000) {
                    state = "Western Australia";
                }
                if (lgaCode >= 60000 && lgaCode < 70000) {
                    state = "Tasmania";
                }
                if (lgaCode >= 70000 && lgaCode < 80000) {
                    state = "Northern Territory";
                }
                if (lgaCode >= 80000 && lgaCode < 90000) {
                    state = "ACT";
                }
                if (lgaCode >= 90000) {
                    state = "Other";
                }

                String type = results.getString("lga_type");
                int area = results.getInt("area_sqkm");
                int population = results.getInt("population");

                stat.setLGAName(name);
                stat.setState(state);
                stat.setLGAType(type);
                stat.setArea(area);
                stat.setPopulation(population);

                lgas.add(stat);
            }

        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return lgas;
    }

    // Method to count number of LGAs in Database
    public int countLGAS() {

        // Create and initialise count variable
        int count = 0;

        Connection connection = null;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // The Query
            String query = "SELECT COUNT(lga_name) AS Total FROM LGA";

            // Get Result
            ResultSet results = statement.executeQuery(query);

            // Process all of the results
            // The "results" variable is similar to an array
            // We can iterate through all of the database query results
            while (results.next()) {
                // We can lookup a column of the a single record in the
                // result using the column name
                // BUT, we must be careful of the column type!
                count = results.getInt("Total");
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return count;
    }

    // Method to count total population for 2016
    public int[] countPop16() {

        Connection connection = null;

        // Create and initialise population and year variables
        int TotalPop = 0;
        int TotalPopYear = 0;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // The Query
            String query = "SELECT SUM(population) AS totalpop,year FROM LGAStatistics WHERE year = 2016";

            // Get Result
            ResultSet results = statement.executeQuery(query);

            // Process all of the results
            // The "results" variable is similar to an array
            // We can iterate through all of the database query results
            while (results.next()) {
                // We can lookup a column of the a single record in the
                // result using the column name
                // BUT, we must be careful of the column type!
                TotalPop = results.getInt("totalpop");
                TotalPopYear = results.getInt("year");
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return new int[] { TotalPop, TotalPopYear };
    }

    // Method to count total population for 2018
    public int[] countPop18() {

        Connection connection = null;

        // Create and initialise population and year variables
        int TotalPop = 0;
        int TotalPopYear = 0;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // The Query
            String query = "SELECT SUM(population) AS totalpop,year FROM LGAStatistics WHERE year = 2018";

            // Get Result
            ResultSet results = statement.executeQuery(query);

            // Process all of the results
            // The "results" variable is similar to an array
            // We can iterate through all of the database query results
            while (results.next()) {
                // We can lookup a column of the a single record in the
                // result using the column name
                // BUT, we must be careful of the column type!
                TotalPop = results.getInt("totalpop");
                TotalPopYear = results.getInt("year");
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return new int[] { TotalPop, TotalPopYear };
    }

    public String changeAgeRange(String ageRange) {
        switch (ageRange) {
            case "_0_9":
                return "0 to 9";
            case "_10_19":
                return "10 to 19";
            case "_20_29":
                return "20 to 29";
            case "_30_39":
                return "30 to 39";
            case "_40_49":
                return "40 to 49";
            case "_50_59":
                return "50 to 59";
            case "_60_plus":
                return "60 plus";
            default:
                return "Error Bruh";
        }
    }

    public ArrayList<Subtask22> getHlAtAndProportion(int lga_code, String status, String proportion, String year) {

        ArrayList<Subtask22> result = new ArrayList<Subtask22>();

        Connection connection = null;

        try {
            // Create connection to the database
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // Get total Population LGA
            String totalPopulationLGAQuery = "select sum(count) as count from HomelessGroup where year = '" + year
                    + "' and status = '" + status + "' and lga_code = '" + lga_code + "'";
            System.out.println(totalPopulationLGAQuery);
            // Get Result
            ResultSet totalLGAPopulationResult = statement.executeQuery(totalPopulationLGAQuery);
            int totalLGAPopulation = totalLGAPopulationResult.getInt("count");

            // Get totalStatePopulation
            String currentState = getState(lga_code);
            String totalPopulationStateQuery = "";
            switch (currentState) {
                case "NSW":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 10000 and lga_code < 20000";
                    break;
                case "Victoria":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 20000 and lga_code < 30000";
                    break;
                case "Queensland":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 30000 and lga_code < 40000";
                    break;
                case "South Australia":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 40000 and lga_code < 50000";
                    break;
                case "Western Australia":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 50000 and lga_code < 60000";
                    break;
                case "Tasmania":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 60000 and lga_code < 70000";
                    break;
                case "Northern Territory":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 70000 and lga_code < 80000";
                    break;
                case "ACT":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 80000 and lga_code < 90000";
                    break;
                case "Other":
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 90000";
                    break;
                default:
                    totalPopulationStateQuery = "SELECT sum(count) as count from homelessgroup where year = '" + year
                            + "' and status = '" + status + "' and lga_code >= 0 and lga_code < 1000000000";
                    break;
            }

            ResultSet totalStatePopulationResult = statement.executeQuery(totalPopulationStateQuery);
            int totalStatePopulation = totalStatePopulationResult.getInt("COUNT");

            // Get totalAustraliaPopulation
            String totalPopulationAUSQuery = "SELECT SUM(COUNT) AS COUNT FROM homelessGroup H WHERE h.year = '"
                    + year + "' AND status = '" + status + "'";
            System.out.println(totalPopulationAUSQuery);
            // Get Result
            ResultSet totalAUSPopulationResult = statement.executeQuery(totalPopulationAUSQuery);

            // Get the total of population of homeless

            int totalAustralianPopulation = totalAUSPopulationResult.getInt("COUNT");

            String query = "";

            switch (proportion) {
                case "Population in LGA":
                    query = "SELECT DISTINCT H.LGA_CODE, h.YEAR, SEX, AGE_GROUP, COUNT, printf('%.2f', COUNT * 1.0 /"
                            + totalLGAPopulation
                            + " * 100.0) as proportion FROM homelessGroup H JOIN LGASTATISTICS L ON H.LGA_CODE = L.LGA_CODE WHERE h.year = '"
                            + year + "' AND status = '" + status + "' AND h.lga_code = '" + lga_code + "'";
                    System.out.println(query);
                    break;
                case "Population in State":
                    query = "SELECT DISTINCT H.LGA_CODE, h.YEAR, SEX, AGE_GROUP, COUNT, printf('%.2f', COUNT * 1.0 /"
                            + totalStatePopulation
                            + " * 100.0) as proportion FROM homelessGroup H JOIN LGASTATISTICS L ON H.LGA_CODE = L.LGA_CODE WHERE h.year = '"
                            + year + "' AND status = '" + status + "' AND h.lga_code = '" + lga_code + "'";
                    System.out.println(query);
                    break;
                case "Population in Australia":
                    query = "SELECT DISTINCT H.LGA_CODE, h.YEAR, SEX, AGE_GROUP, COUNT, printf('%.2f', COUNT * 1.0 /"
                            + totalAustralianPopulation
                            + " * 100.0) as proportion FROM homelessGroup H JOIN LGASTATISTICS L ON H.LGA_CODE = L.LGA_CODE WHERE h.year = '"
                            + year + "' AND status = '" + status + "' AND h.lga_code = '" + lga_code + "'";
                    System.out.println(query);
                    break;
                default:
                    query = "SELECT DISTINCT H.LGA_CODE, h.YEAR, SEX, AGE_GROUP, COUNT, printf('%.2f', COUNT * 1.0 /"
                            + totalLGAPopulation
                            + " * 100.0) as proportion FROM homelessGroup H JOIN LGASTATISTICS L ON H.LGA_CODE = L.LGA_CODE WHERE h.year = '"
                            + year + "' AND status = '" + status + "' AND h.lga_code = '" + lga_code + "'";
                    System.out.println(query + " DEFAULT*******");
                    break;
            }

            // Get Result
            ResultSet results = statement.executeQuery(query);

            while (results.next()) {
                Subtask22 getResults = new Subtask22();

                String sex = results.getString("SEX");
                String ageRange = results.getString("AGE_GROUP");
                int count = results.getInt("COUNT");
                double prop = results.getDouble("proportion");

                ageRange = changeAgeRange(ageRange);

                sex = changeDatabaseSexToNormalSex(sex);

                getResults.setSex(sex);
                getResults.setAgeRange(ageRange);
                getResults.setCount(count);
                getResults.setProportion(prop);

                result.add(getResults);
            }

        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return result;
    }

    // Method for getting state
    public String getState(int lgaCode) {
        if (lgaCode / 10000 == 1) {
            return "NSW";
        } else if (lgaCode / 10000 == 2) {
            return "Victoria";
        } else if (lgaCode / 10000 == 3) {
            return "Queensland";
        } else if (lgaCode / 10000 == 4) {
            return "South Australia";
        } else if (lgaCode / 10000 == 5) {
            return "Western Australia";
        } else if (lgaCode / 10000 == 6) {
            return "Tasmania";
        } else if (lgaCode / 10000 == 7) {
            return "Northern Territory ";
        } else if (lgaCode / 10000 == 8) {
            return "ACT";
        } else if (lgaCode / 10000 == 9) {
            return "Other";
        } else {
            return "";
        }
    }

    // Method to retrieve student 1 number and name from Database
    public String[] getStudent1() {

        // Create and initialise student number and name variables
        String studentno = "";
        String studentname = "";
        String studentemail = "";

        Connection connection = null;

        try {
            // Create connection to the database
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // The Query
            String query = "SELECT studentID, name, email FROM Student ORDER BY name ASC";

            // Get Result
            ResultSet results = statement.executeQuery(query);

            // Process all of the results
            // The "results" variable is similar to an array
            // We can iterate through all of the database query results
            while (results.next()) {
                // We can lookup a column of the a single record in the
                // result using the column name
                // BUT, we must be careful of the column type!
                studentno = results.getString("studentID");
                studentname = results.getString("name");
                studentemail = results.getString("email");
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return new String[] { studentno, studentname, studentemail };
    }

    // Method to retrieve student 2 number and name from Database
    public String[] getStudent2() {

        // Create and initialise student number and name variables
        String studentno = "";
        String studentname = "";
        String studentemail = "";
        

        Connection connection = null;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // The Query
            String query = "SELECT studentID, name, email FROM Student ORDER BY name DESC";

            // Get Result
            ResultSet results = statement.executeQuery(query);

            // Process all of the results
            // The "results" variable is similar to an array
            // We can iterate through all of the database query results
            while (results.next()) {
                // We can lookup a column of the a single record in the
                // result using the column name
                // BUT, we must be careful of the column type!
                studentno = results.getString("studentID");
                studentname = results.getString("name");
                studentemail = results.getString("email");
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return new String[] { studentno, studentname, studentemail };
    }

    public ArrayList<Subtask21> get21Results(String status, String orderBy, String sex, String ageRange,
            String orderFrom, String state, String year) {

        ArrayList<Subtask21> result = new ArrayList<Subtask21>();

        Connection connection = null;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // Get total Population LGA
            String totalPopulationLGAQuery = "select sum(count) as count from HomelessGroup where year = '" + year
                    + "' and status = '" + status + "' and lga_code >= '" + getStateLGACodes(state)[0]
                    + "' AND lga_code < '" + getStateLGACodes(state)[1] + "'";
            System.out.println(totalPopulationLGAQuery);
            // Get Result
            ResultSet totalLGAPopulationResult = statement.executeQuery(totalPopulationLGAQuery);
            int totalLGAPopulation = totalLGAPopulationResult.getInt("count");

            String query = "";

            switch (orderBy) {
                case "Age Range":
                    if (orderFrom.toLowerCase().equals("lowest to highest")) {
                        query = "select l.lga_name, year, sex, age_group, status, count, printf('%.2f', count * 1.0 / "
                                + totalLGAPopulation
                                + " * 100) as proportion from HomelessGroup h  JOIN LGA l ON l.lga_code = h.lga_code  WHERE status = '"
                                + status + "' AND h.lga_code >= '" + getStateLGACodes(state)[0] + "' AND h.lga_code < '"
                                + getStateLGACodes(state)[1] + "' AND age_group = '" + ageRange
                                + "' AND year = '" + year + "' ORDER BY count  ASC";
                    } else if (orderFrom.toLowerCase().equals("highest to lowest")) {
                        query = "select l.lga_name, year, sex, age_group, status, count, printf('%.2f', count * 1.0 / "
                                + totalLGAPopulation
                                + " * 100) as proportion from HomelessGroup h  JOIN LGA l ON l.lga_code = h.lga_code  WHERE status = '"
                                + status + "' AND h.lga_code >= '" + getStateLGACodes(state)[0] + "' AND h.lga_code < '"
                                + getStateLGACodes(state)[1] + "' AND age_group = '" + ageRange
                                + "' AND year = '" + year + "' ORDER BY count  DESC";
                    }
                    break;
                case "Sex":
                    if (orderFrom.toLowerCase().equals("lowest to highest")) {
                        query = "select l.lga_name, year, sex, age_group, status, count, printf('%.2f', count * 1.0 / "
                                + totalLGAPopulation
                                + " * 100) as proportion from HomelessGroup h  JOIN LGA l ON l.lga_code = h.lga_code  WHERE status = '"
                                + status + "' AND h.lga_code >= '" + getStateLGACodes(state)[0] + "' AND h.lga_code < '"
                                + getStateLGACodes(state)[1] + "' AND sex = '" + sex
                                + "' AND year = '" + year + "' ORDER BY count  ASC";
                    } else if (orderFrom.toLowerCase().equals("highest to lowest")) {
                        query = "select l.lga_name, year, sex, age_group, status, count, printf('%.2f', count * 1.0 / "
                                + totalLGAPopulation
                                + " * 100) as proportion from HomelessGroup h  JOIN LGA l ON l.lga_code = h.lga_code  WHERE status = '"
                                + status + "' AND h.lga_code >= '" + getStateLGACodes(state)[0] + "' AND h.lga_code < '"
                                + getStateLGACodes(state)[1] + "' AND sex = '" + sex
                                + "' AND year = '" + year + "' ORDER BY count  DESC";
                    }
                    break;
                case "Total Population":
                    if (orderFrom.toLowerCase().equals("lowest to highest")) {
                        query = "select l.lga_name, year, sex, age_group, status, count, printf('%.2f', count * 1.0 / "
                                + totalLGAPopulation
                                + " * 100) as proportion from HomelessGroup h  JOIN LGA l ON l.lga_code = h.lga_code  WHERE status = '"
                                + status + "' AND h.lga_code >= '" + getStateLGACodes(state)[0] + "' AND h.lga_code < '"
                                + getStateLGACodes(state)[1] + "' AND year = '" + year
                                + "' ORDER BY count  ASC";
                    } else if (orderFrom.toLowerCase().equals("highest to lowest")) {
                        query = "select l.lga_name, year, sex, age_group, status, count, printf('%.2f', count * 1.0 / "
                                + totalLGAPopulation
                                + " * 100) as proportion from HomelessGroup h  JOIN LGA l ON l.lga_code = h.lga_code  WHERE status = '"
                                + status + "' AND h.lga_code >= '" + getStateLGACodes(state)[0] + "' AND h.lga_code < '"
                                + getStateLGACodes(state)[1] + "' AND year = '" + year
                                + "' ORDER BY count  DESC";
                    }
                    break;
                default:
                    System.out.println("SWITCH STATEMENT ERROR");
                    break;
            }

            // Get Result
            System.out.println(query);
            ResultSet results = statement.executeQuery(query);

            while (results.next()) {
                Subtask21 resulty = new Subtask21();

                String lgaNameResult = results.getString("lga_name");
                String sexResult = results.getString("sex");
                String ageRangeResult = results.getString("age_group");
                String statusResult = results.getString("status");
                int countResult = results.getInt("count");
                double proportionResult = results.getDouble("proportion");

                ageRangeResult = changeAgeRange(ageRangeResult);

                statusResult = changeDatabaseStatusToNormalStatus(statusResult);

                sexResult = changeDatabaseSexToNormalSex(sexResult);

                resulty.setLGAName(lgaNameResult);
                resulty.setSex(sexResult);
                resulty.setAgeGroup(ageRangeResult);
                resulty.setStatus(statusResult);
                resulty.setCount(countResult);
                resulty.setProportion(proportionResult);

                result.add(resulty);

            }
            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return result;
    }

    public String changeNormalAgeToDatabaseAge(String age) {
        switch (age) {
            case "0 to 9":
                return "_0_9";
            case "10 to 19":
                return "_10_19";
            case "20 to 29":
                return "_20_29";
            case "30 to 39":
                return "_30_39";
            case "40 to 49":
                return "_40_49";
            case "50 to 59":
                return "_50_59";
            case "60 and above":
                return "_60_plus";
            default:
                return "Error Bruh";
        }
    }

    public String changeNormalSexToDatabaseSex(String sex) {
        switch (sex) {
            case "Male":
                return "m";
            case "Female":
                return "f";
            default:
                return "ERROR";
        }
    }

    public String changeDatabaseSexToNormalSex(String sex) {
        switch (sex) {
            case "m":
                return "Male";
            case "f":
                return "Female";
            default:
                return "ERROR BRUH";
        }
    }

    public String changeNormalStatusToDatabaseStatus(String status) {
        switch (status) {
            case "Homeless":
                return "homeless";
            case "At Risk":
                return "at_risk";
            default:
                return "Error";
        }
    }

    public String changeDatabaseStatusToNormalStatus(String status) {
        switch (status) {
            case "homeless":
                return "Homeless";
            case "at_risk":
                return "At Risk";
            default:
                return "error";
        }
    }

    public int[] getStateLGACodes(String state) {
        switch (state) {
            case "NSW":
                int[] result = { 10000, 20000 };
                return result;
            case "Victoria":
                int[] resultVic = { 20000, 30000 };
                return resultVic;
            case "Queensland":
                int[] resultQ = { 30000, 40000 };
                return resultQ;
            case "South Australia":
                int[] resultS = { 40000, 50000 };
                return resultS;
            case "Western Australia":
                int[] resultW = { 50000, 60000 };
                return resultW;
            case "Tasmania":
                int[] resultT = { 60000, 70000 };
                return resultT;
            case "Northern Territory":
                int[] resultN = { 70000, 80000 };
                return resultN;
            case "ACT":
                int[] resultAC = { 80000, 90000 };
                return resultAC;
            case "Other":
                int[] resultOT = { 90000, 100000000 };
                return resultOT;
            default:
                int[] resultOTW = { 0, 100000000 };
                return resultOTW;
        }
    }

    public ArrayList<Personas> getAttributes(String name) {

        ArrayList<Personas> result = new ArrayList<Personas>();

        // Create and initialise persona details
        String personaName = "";
        String attributeType = "";
        String description = "";

        Connection connection = null;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // The Query
            String query = "SELECT * FROM PersonaAttribute WHERE name = '" + name + "'";

            // Get Result
            ResultSet results = statement.executeQuery(query);

            // Process all of the results
            // The "results" variable is similar to an array
            // We can iterate through all of the database query results
            while (results.next()) {
                // We can lookup a column of the a single record in the
                // result using the column name
                // BUT, we must be careful of the column type!
                personaName = results.getString("name");
                attributeType = results.getString("attributeType");
                description = results.getString("description");

                Personas bruh = new Personas();

                bruh.setName(personaName);
                bruh.setAttributeType(attributeType);
                bruh.setDescription(description);

                result.add(bruh);
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return result;
    }

    public ArrayList<Subtask31> getSubtask31Result(String state, String sex, String metric, String orderBy,
            String ageRange1, String ageRange2, String mortgageRange1, String mortgageRange2, String rentRange1,
            String rentRange2, String incomeRange1, String incomeRange2) {

        ArrayList<Subtask31> result = new ArrayList<Subtask31>();

        Connection connection = null;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            String query = "SELECT ls.lga_code, lga_name, median_age, median_mortgage_repay_monthly, median_rent_weekly, median_household_weekly_income, sum(count) as total_homeless, printf('%.0f', (sum(count) * 1.0 /ls.population) * 1000) as Homeless_population_per_1000_people FROM LGAStatistics ls JOIN LGA l on ls.lga_code = l.lga_code JOIN HomelessGroup h on ls.lga_code = h.lga_code WHERE ls.year = 2018 AND median_age IS NOT NULL AND h.status = 'homeless' AND ls.lga_code >= "
                    + getStateLGACodes(state)[0] + " AND ls.lga_code < " + getStateLGACodes(state)[1] + " AND sex = '"
                    + changeNormalSexToDatabaseSex(sex) + "'";

            if (!ageRange1.equals("") || !ageRange2.equals("")) {
                query += " AND median_age >= " + ageRange1 + " AND median_age <= " + ageRange2;
            }

            if (!mortgageRange1.equals("") || !mortgageRange2.equals("")) {
                query += " AND median_mortgage_repay_monthly >= " + mortgageRange1
                        + " AND median_mortgage_repay_monthly <= " + mortgageRange2;
            }

            if (!rentRange1.equals("") || !rentRange2.equals("")) {
                query += " AND median_rent_weekly >= " + rentRange1 + " AND median_rent_weekly <= " + rentRange2;
            }

            if (!incomeRange1.equals("") || !incomeRange2.equals("")) {
                query += " AND median_household_weekly_income >= " + incomeRange1
                        + " AND median_household_weekly_income <= " + incomeRange2;
            }

            query += " GROUP BY ls.lga_code";

            if (metric.equals("Median Age")) {
                if (orderBy.equals("Highest to Lowest")) {
                    query += " ORDER BY median_age DESC";
                } else if (orderBy.equals("Lowest to Highest")) {
                    query += " ORDER BY median_age ASC";
                }
            }
            if (metric.equals("Median Mortgage")) {
                if (orderBy.equals("Highest to Lowest")) {
                    query += " ORDER BY median_mortgage_repay_monthly DESC";
                } else if (orderBy.equals("Lowest to Highest")) {
                    query += " ORDER BY median_mortgage_repay_monthly ASC";
                }
            }
            if (metric.equals("Median Weekly Rent")) {
                if (orderBy.equals("Highest to Lowest")) {
                    query += " ORDER BY median_rent_weekly DESC";
                } else if (orderBy.equals("Lowest to Highest")) {
                    query += " ORDER BY median_rent_weekly ASC";
                }
            }
            if (metric.equals("Median Weekly Income")) {
                if (orderBy.equals("Highest to Lowest")) {
                    query += " ORDER BY median_household_weekly_income DESC";
                } else if (orderBy.equals("Lowest to Highest")) {
                    query += " ORDER BY median_household_weekly_income ASC";
                }
            }

            if (metric.equals("Homeless Population per 1000 People")) {
                if (orderBy.equals("Highest to Lowest")) {
                    query += " ORDER BY (sum(count) * 1.0 /ls.population) DESC";
                } else if (orderBy.equals("Lowest to Highest")) {
                    query += " ORDER BY (sum(count) * 1.0 /ls.population) ASC";
                }
            }

            System.out.println(query);

            // Get Result
            ResultSet results = statement.executeQuery(query);

            while (results.next()) {
                Subtask31 gang = new Subtask31();

                String lgaNameResult = results.getString("lga_name");
                int totalRatio = results.getInt("Homeless_population_per_1000_people");
                int medianAge = results.getInt("median_age");
                int medianMortgage = results.getInt("median_mortgage_repay_monthly");
                int medianRent = results.getInt("median_rent_weekly");
                int medianIncome = results.getInt("median_household_weekly_income");

                gang.setLGAName(lgaNameResult);
                gang.setTotalRatio(totalRatio);
                gang.setMedianAge(medianAge);
                gang.setMedianMortgage(medianMortgage);
                gang.setMedianRent(medianRent);
                gang.setMedianIncome(medianIncome);

                result.add(gang);
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return result;
    }

    public ArrayList<Subtask32> getSubtask32(String state, String sex, String age, String metric, String change,
            String orderBy) {

        ArrayList<Subtask32> result = new ArrayList<Subtask32>();

        Connection connection = null;

        try {
            // Connect to JDBC data base
            connection = DriverManager.getConnection(DATABASE);

            // Prepare a new SQL Query & Set a timeout
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);

            // The Query
            String query = "select lga_name, lga_code, age_group, sex, homeless2018 - homeless2016 as totalHomelessChange, IFNULL(round(((((homeless2018 * 1.0) - homeless2016)/homeless2016 * 100.0)), 2), '0 Homeless at 2016') as homelessPercent, atRisk2018 - atRisk2016 as totalAtRiskChange, IFNULL(round(((((atRisk2018 * 1.0) - atRisk2016)/atRisk2016 * 100.0)), 2), '0 At Risk at 2016') as AtRiskPercent, population2018 - population2016 as totalChangeInPopulation, round(((((population2018 * 1.0) - population2016)/population2016 * 100.0)), 2) as PopulationChangePercent from subtask31";

            query += " WHERE lga_code > " + getStateLGACodes(state)[0] + " AND lga_code <= "
                    + getStateLGACodes(state)[1];
            query += " AND sex = '" + changeNormalSexToDatabaseSex(sex) + "'";

            query += " AND age_group = '" + changeNormalAgeToDatabaseAge(age) + "'";

            switch (metric) {
                case "Change In Homelessness Population":
                    if (change.equals("Positive Change")) {
                        query += " AND totalHomelessChange > 0";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalHomelessChange DESC";
                        } else {
                            query += " ORDER BY totalHomelessChange ASC";
                        }    
                        System.out.println(query + "WORKING");
                    } else if (change.equals("Negative Change")) {
                        query += " AND totalHomelessChange < 0";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalHomelessChange ASC";
                        } else {
                            query += " ORDER BY totalHomelessChange DESC";
                        }    
                    } else if (change.equals("Both")) {
                        query += "";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalHomelessChange DESC";
                        } else {
                            query += " ORDER BY totalHomelessChange ASC";
                        }
                    }

                    
                    break;
                case "Change In At Risk Population":
                    if (change.equals("Positive Change")) {
                        query += " AND totalAtRiskChange > 0";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalAtRiskChange DESC";
                        } else {
                            query += " ORDER BY totalAtRiskChange ASC";
                        }
                    } else if (change.equals("Negative Change")) {
                        query += " AND totalAtRiskChange < 0";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalAtRiskChange ASC";
                        } else {
                            query += " ORDER BY totalAtRiskChange DESC";
                        }
                    } else if (change.equals("Both")) {
                        query += "";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalAtRiskChange DESC";
                        } else {
                            query += " ORDER BY totalAtRiskChange ASC";
                        }
                    }

                   

                    break;
                case "Change In Total Population":
                    if (change.equals("Positive Change")) {
                        query += " AND totalChangeInPopulation > 0";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalChangeInPopulation DESC";
                        } else {
                            query += " ORDER BY totalChangeInPopulation ASC";
                        }
                    } else if (change.equals("Negative Change")) {
                        query += " AND totalChangeInPopulation < 0";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalChangeInPopulation ASC";
                        } else {
                            query += " ORDER BY totalChangeInPopulation DESC";
                        }
                    } else if (change.equals("Both")) {
                        query += "";
                        if (orderBy.equals("Highest to Lowest")) {
                            query += " ORDER BY totalChangeInPopulation DESC";
                        } else {
                            query += " ORDER BY totalChangeInPopulation ASC";
                        }
                    }

                    

                    break;
                default:
                    System.out.println("SWITCH METRIC ERROR");
                    break;
            }

            // Get Result
            System.out.println(query);
            ResultSet results = statement.executeQuery(query);

            while (results.next()) {
                Subtask32 gang = new Subtask32();

                String lgaName = results.getString("lga_name");
                int changeInHomeless = results.getInt("totalHomelessChange");
                double changeInHomelessPercent = results.getDouble("homelessPercent");
                int changeInAtrisk = results.getInt("totalAtRiskChange");
                double changeInAtRiskPercent = results.getDouble("AtRiskPercent");
                int totalChangeInPopulation = results.getInt("totalChangeInPopulation");
                double totalChangeInPopulationPercent = results.getDouble("PopulationChangePercent");

                gang.setLgaName(lgaName);
                gang.setChangeInHomeless(changeInHomeless);
                gang.setChangeInHomelessPercent(changeInHomelessPercent);
                gang.setChangeInAtrisk(changeInAtrisk);
                gang.setChangeInAtRiskPercent(changeInAtRiskPercent);
                gang.setTotalChangeInPopulation(totalChangeInPopulation);
                gang.setTotalChangeInPopulationPercent(totalChangeInPopulationPercent);

                result.add(gang);
            }

            // Close the statement because we are done with it
            statement.close();
        } catch (SQLException e) {
            // If there is an error, lets just pring the error
            System.err.println(e.getMessage());
        } finally {
            // Safety code to cleanup
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                // connection close failed.
                System.err.println(e.getMessage());
            }
        }

        return result;
    }
}