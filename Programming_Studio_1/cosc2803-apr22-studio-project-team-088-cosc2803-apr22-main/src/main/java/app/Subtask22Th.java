package app;

import java.io.ObjectInputFilter.Status;
import java.security.DrbgParameters.Reseed;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.jetty.server.handler.ContextHandler.StaticContext;

import io.javalin.http.Context;
import io.javalin.http.Handler;

public class Subtask22Th implements Handler {

    public static final String URL = "/page4.html";

    public static final String TEMPLATE = "/subtask22.html";

    public void handle(Context context) throws Exception {

        Map<String, Object> model = new HashMap<String, Object>();

        // Creating the JDBC Connection
        JDBCConnection jdbc = new JDBCConnection();

        // STATE DROP
        String state_drop = context.formParam("state_drop");
        // Selecting all the states
        ArrayList<String> state = new ArrayList<String>();
        state.add("All States");
        state.add("New South Wales");
        state.add("Victoria");
        state.add("Queensland");
        state.add("South Australia");
        state.add("Western Australia");
        state.add("Tasmania");
        state.add("Northern Territory");
        state.add("Australian Capital Territory");
        state.add("Other");

        model.put("state", state);

        // LGA DROP BASED ON STATE
        String lga_drop = context.formParam("lga_drop");
        // Getting the LGA from State
            ArrayList<LGA> lgaState = jdbc.getLGAs();

            ArrayList<String> lgaStateString = new ArrayList<String>();
            for (LGA lgas : lgaState) {
                lgaStateString.add(lgas.getName16() + " " + lgas.getCode16());
            }
            model.put("lgas", lgaStateString);

        // Saving LGA CODE
        int saveLGACode = 0;
        // Listing LGA RESULTS
        if (lga_drop == null) {
            ArrayList<String> results = new ArrayList<String>();
            model.put("result", results);
        } else {
            // Converting lga_code
            String lga_code_clean = lga_drop.replaceAll("\\D+","");
            int lga_codes = Integer.parseInt(lga_code_clean);

                saveLGACode = lga_codes;
            
            ArrayList<LGAStatistics> results = jdbc.getLGAFromCode(lga_codes);
            model.put("result", results);
        }
            System.out.println(saveLGACode + "saved lga code");

        // Status Dropdown
        String status_drop = context.formParam("status_drop");
        ArrayList<String> status = new ArrayList<String>();
        status.add("Homeless");
        status.add("At Risk");
        // Mapping the model
        model.put("status", status);

        // Proportion Dropdown    
        String prop_drop = context.formParam("prop_drop");
        ArrayList<String> prop = new ArrayList<String>();
        prop.add("Population in LGA");
        prop.add("Population in State");
        prop.add("Population in Australia");
        // Mapping the model
        model.put("prop", prop);

        // Year Dropdown
        String year_drop = context.formParam("year_drop");
        ArrayList<String> year = new ArrayList<String>();
        year.add("2016");
        year.add("2018");
        // Mapping the model
        model.put("year", year);


        // Listing the results
        if (saveLGACode == 0 || status_drop == null || prop_drop == null || year_drop == null) {
            ArrayList<String> results = new ArrayList<String>();
            model.put("resultTable2", results);
            System.out.println(lga_drop + " " + status_drop + " " + prop_drop + " " + year_drop);
            System.out.println(saveLGACode + "saved lga code");

            model.put("show_LGA", new String("LGA : None Selected"));
            model.put("show_status", new String("Status : None Selected"));
            model.put("show_year", new String("Year : None Selected"));
            model.put("show_prop", new String("Proportion : None Selected"));
        } else {
            model.put("show_status", new String("Status : " + status_drop));
            
            // Converting status
            switch (status_drop) {
                case "Homeless":
                    status_drop = "homeless";
                    break;
                case "At Risk":
                    status_drop = "at_risk";
                default :
                System.out.println("status_drop error");
                break;
            }

            ArrayList<Subtask22> results = jdbc.getHlAtAndProportion(saveLGACode, status_drop, prop_drop, year_drop);
            System.out.println("Table 2 Created");
            model.put("resultTable2", results);

            model.put("show_LGA", new String("LGA : " + lga_drop));
            model.put("show_year", new String("Year : " + year_drop));
            model.put("show_prop", new String("Proportion : " + prop_drop));
        }

        

        // Redering the webpage
        context.render(TEMPLATE, model);
    }
    
}
