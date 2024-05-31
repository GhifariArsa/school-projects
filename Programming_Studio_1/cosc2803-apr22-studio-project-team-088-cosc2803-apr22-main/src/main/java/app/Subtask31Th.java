package app;

import java.io.ObjectInputFilter.Status;
import java.security.DrbgParameters.Reseed;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.jetty.server.handler.ContextHandler.StaticContext;

import io.javalin.http.Context;
import io.javalin.http.Handler;

public class Subtask31Th implements Handler {

    public static final String URL = "/page5.html";

    public static final String TEMPLATE = "/subtask31.html";

    public void handle(Context context) throws Exception {

        Map<String, Object> model = new HashMap<String, Object>();

        // Creating new JDBC Connection
        JDBCConnection jdbc = new JDBCConnection();

        // List all the lGAs
        ArrayList<LGA> lga = jdbc.getLGAs();
        ArrayList<String> lgaString = new ArrayList<String>();
        for (LGA lgas : lga) {
            lgaString.add(lgas.getName16() + " " + lgas.getCode16());
        }
        // Defining the lga for thymeleaf
        model.put("lgas", lgaString);

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

        // Sex drop down
        String sex_drop = context.formParam("sex_drop");
        ArrayList<String> sex = new ArrayList<String>();
        sex.add("Male");
        sex.add("Female");
        model.put("sex", sex);

        // Metric Dropdown
        String metric_drop = context.formParam("metric_drop");
        ArrayList<String> metric = new ArrayList<String>();
        metric.add("Median Age");
        metric.add("Median Mortgage");
        metric.add("Median Weekly Rent");
        metric.add("Median Weekly Income");
        metric.add("Homeless Population per 1000 People");
        model.put("metric", metric);

        // Order By Dropdown
        String order_drop = context.formParam("order_drop");
        ArrayList<String> order = new ArrayList<String>();
        order.add("Highest to Lowest");
        order.add("Lowest to Highest");
        model.put("order", order);

        // Text box for the median age
        String ageRangeMin = context.formParam("age_range1");
        String ageRangeMax = context.formParam("age_range2");

        System.out.println(ageRangeMax + ' ' + ageRangeMin);

        // Text box for the mortgage range
        String mortgageRangeMin = context.formParam("mortgage_range1");
        String mortgageRangeMax = context.formParam("mortgage_range2");

        // Text box for the rent range
        String rentRangeMin = context.formParam("rent_range1");
        String rentRangeMax = context.formParam("rent_range2");

        // Text box for income range
        String incomeRangeMin = context.formParam("income_range1");
        String incomeRangeMax = context.formParam("income_range2");
        if (mortgageRangeMin != null || mortgageRangeMax != null) {
            if (!mortgageRangeMin.equals("") || !mortgageRangeMax.equals("")) {
                model.put("show_mortgage",
                        new String("Median Mortgage Range: " + mortgageRangeMin + " - " + mortgageRangeMax));
            }
        }
        if (rentRangeMin != null || rentRangeMax != null) {
            if (!rentRangeMin.equals("") || !rentRangeMax.equals("")) {
                model.put("show_rent", new String("Median Rent Range: " + rentRangeMin + " - " + rentRangeMax));
            }
        }

        if (incomeRangeMin != null || incomeRangeMax != null) {
            if (!incomeRangeMin.equals("") || !incomeRangeMax.equals("")) {
                model.put("show_income", new String("Median Income Range: " + incomeRangeMin + " - " + incomeRangeMax));
            }
        }

        if (ageRangeMin != null || ageRangeMax != null) {
            if (!ageRangeMin.equals("") || !ageRangeMax.equals("")) {
                model.put("show_age", new String("Median Age Range: " + ageRangeMin + " - " + ageRangeMax));
            }
        }

        if (state_drop == null || sex_drop == null || metric_drop == null || order_drop == null) {
            ArrayList<Subtask31> result = new ArrayList<Subtask31>();
            model.put("result", result);

            model.put("show_state", new String("State: None Selected"));
            model.put("show_sex", new String("Sex: None Selected"));
            model.put("show_metric", new String("Metric to Order By: None Selected"));
            model.put("show_order", new String("Order By: None Selected"));
        } else {
            model.put("show_state", new String("State: " + state_drop));
            model.put("show_sex", new String("Sex: " + sex_drop));
            model.put("show_metric", new String("Metric to Order By: " + metric_drop));
            model.put("show_order", new String("Order By: " + order_drop));
            ArrayList<Subtask31> result = jdbc.getSubtask31Result(state_drop, sex_drop, metric_drop, order_drop,
                    ageRangeMin, ageRangeMax, mortgageRangeMin, mortgageRangeMax, rentRangeMin, rentRangeMax,
                    incomeRangeMin, incomeRangeMax);

            model.put("result", result);
        }

        // Rendering the page
        context.render(TEMPLATE, model);
    }
}
