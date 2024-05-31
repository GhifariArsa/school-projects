package app;

import java.io.ObjectInputFilter.Status;
import java.lang.reflect.Array;
import java.security.DrbgParameters.Reseed;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JList.DropLocation;

import org.eclipse.jetty.server.handler.ContextHandler.StaticContext;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import javassist.compiler.ast.CondExpr;

/**
 * Example Index HTML class using Javalin
 * <p>
 * Generate a static HTML page using Javalin
 * by writing the raw HTML into a Java String object
 *
 * @author Timothy Wiley, 2021. email: timothy.wiley@rmit.edu.au
 * @author Santha Sumanasekara, 2021. email: santha.sumanasekara@rmit.edu.au
 */
public class Subtask21Th implements Handler {

    // TODO Refactor Everything to fit the desired look
    // URL of this page relative to http://localhost:7001/
    public static final String URL = "/page3.html";

    public static final String TEMPLATE = "/subtask21.html";

    @Override
    public void handle(Context context) throws Exception {

        Map<String, Object> model = new HashMap<String, Object>();

        JDBCConnection jdbc = new JDBCConnection();

        // Status Drop Down Menu
        String status_drop = context.formParam("status_drop");
        ArrayList<String> status = new ArrayList<String>();
        status.add("Homeless");
        status.add("At Risk");
        model.put("status", status);

        // Order By Dropdown
        String order_drop = context.formParam("order_drop");
        ArrayList<String> order = new ArrayList<String>();
        order.add("Age Range");
        order.add("Sex");
        order.add("Total Population");
        model.put("order", order);

        // Age Range Drop Down
        String age_drop = context.formParam("age_drop");
        ArrayList<String> age = new ArrayList<String>();
        age.add("0 to 9");
        age.add("10 to 19");
        age.add("20 to 29");
        age.add("30 to 39");
        age.add("40 to 49");
        age.add("50 to 59");
        age.add("60 and above");
        model.put("age", age);

        // Sex drop down
        String sex_drop = context.formParam("sex_drop");
        ArrayList<String> sex = new ArrayList<String>();
        sex.add("Male");
        sex.add("Female");
        model.put("sex", sex);

        // Order by what
        String orderBy_drop = context.formParam("orderBy_drop");
        ArrayList<String> orderBy = new ArrayList<String>();
        orderBy.add("Highest to Lowest");
        orderBy.add("Lowest to Highest");
        model.put("order_by", orderBy);

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

        // Save LGA Code
        int saveLGACode = 0;

        // LGA DROP BASED ON STATE
        String lga_drop = context.formParam("lga_drop");
        // Getting the LGA from State
        if (state_drop == null) {
            ArrayList<String> lgaStateString = new ArrayList<String>();
            model.put("lgas", lgaStateString);
        } else {
            // IF NOT NULL
            ArrayList<LGA> lgaState = jdbc.getLGAOnState(state_drop);

            ArrayList<String> lgaStateString = new ArrayList<String>();
            for (LGA lgas : lgaState) {
                lgaStateString.add(lgas.getName16() + " " + lgas.getCode16());

                model.put("lgas", lgaStateString);
            }
        }

        if (lga_drop != null) {
            // Converting lga_code
            String lga_code_clean = lga_drop.replaceAll("\\D+", "");
            int lga_codes = Integer.parseInt(lga_code_clean);
            saveLGACode = lga_codes;
        }

        // Year Dropdown
        String year_drop = context.formParam("year_drop");
        ArrayList<String> year = new ArrayList<String>();
        year.add("2016");
        year.add("2018");
        // Mapping the model
        model.put("year", year);

        // * Listing Results
        if (state_drop == null || order_drop == null || orderBy_drop == null || order_drop == null
                || year_drop == null || status_drop == null) {
            ArrayList<Subtask21> result = new ArrayList<Subtask21>();
            model.put("result", result);

            // For the show result Card
            model.put("show_orderBy", new String("Ordered By: None Selected"));
            model.put("show_state", new String("State: None Selected"));
            model.put("show_status", new String("Status: None Selected"));
            model.put("show_order", new String("Status: None Selected"));
            model.put("show_year", new String("Year: None Selected"));
        } else {

            status_drop = jdbc.changeNormalStatusToDatabaseStatus(status_drop);

            if (sex_drop == null) {
                sex_drop = "";
            } else {
                model.put("show_orderBy", new String("Ordered By: " + order_drop + " = " + sex_drop));
                sex_drop = jdbc.changeNormalSexToDatabaseSex(sex_drop);
            }

            if (age_drop == null) {
                age_drop = "";
            } else {
                age_drop = jdbc.changeNormalAgeToDatabaseAge(age_drop);
                model.put("show_orderBy", new String("Ordered By: " + order_drop + " = " + jdbc.changeAgeRange(age_drop)));
            }

            if (sex_drop == null && age_drop == null) {
                model.put("show_orderBy", new String("Ordered By: Total Population"));
            }

            model.put("show_state", new String("State: " + state_drop));
            model.put("show_status", new String("Status: " + jdbc.changeDatabaseStatusToNormalStatus(status_drop)));
            model.put("show_order", new String("Order From: " + orderBy_drop));
            model.put("show_year", new String("Year: " + year_drop));


            ArrayList<Subtask21> result = jdbc.get21Results(status_drop, order_drop, sex_drop, age_drop, orderBy_drop,
                    state_drop, year_drop);
            System.out.println("Table Created****");
            model.put("result", result);
        }

        // * TESTING
        System.out.println("OrderDrop = " + order_drop);
        System.out.println("age_drop = " + age_drop);
        System.out.println("sex_drop = " + sex_drop);
        System.out.println("orderBy_drop = " + orderBy_drop);
        System.out.println("lga_drop = " + order_drop);
        System.out.println("year_drop = " + year_drop);
        System.out.println("status_drop = " + status_drop);
        System.out.println("State_drop = " + state_drop);

    

        // DO NOT MODIFY THIS
        // Makes Javalin render the webpage
        context.render(TEMPLATE, model);

    }

}
