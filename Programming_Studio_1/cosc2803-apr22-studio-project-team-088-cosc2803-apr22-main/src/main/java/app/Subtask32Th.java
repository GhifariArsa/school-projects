package app;

import java.io.ObjectInputFilter.Status;
import java.lang.reflect.Array;
import java.security.DrbgParameters.Reseed;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.jetty.server.handler.ContextHandler.StaticContext;

import io.javalin.http.Context;
import io.javalin.http.Handler;

public class Subtask32Th implements Handler {

    // URL of this page relative to http://localhost:7001/
    public static final String URL = "/page6.html";

    public static final String TEMPLATE = "/subtask32.html";

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

        // Sex drop down
        String sex_drop = context.formParam("sex_drop");
        ArrayList<String> sex = new ArrayList<String>();
        sex.add("Male");
        sex.add("Female");
        model.put("sex", sex);

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

        // Metric Drop Down
        String metric_drop = context.formParam("metric_drop");
        ArrayList<String> metric = new ArrayList<String>();
        metric.add("Change In Homelessness Population");
        metric.add("Change In At Risk Population");
        metric.add("Change In Total Population");
        model.put("metric", metric);

        // Change Drop Down
        String change_drop = context.formParam("change_drop");
        ArrayList<String> change = new ArrayList<String>();
        change.add("Positive Change");
        change.add("Negative Change");
        change.add("Both");
        model.put("change", change);

        // Order By Drop down
        String order_drop = context.formParam("order_drop");
        ArrayList<String> order = new ArrayList<String>();
        order.add("Highest to Lowest");
        order.add("Lowest to Highest");
        model.put("order", order);


        if (state_drop == null || sex_drop == null || age_drop == null || metric_drop == null || change_drop == null || order_drop == null) {
            ArrayList<Subtask32> result = new ArrayList<Subtask32>();
            model.put("result", result);
            model.put("show_state", new String("State: None Selected"));
            model.put("show_sex", new String("Sex: None Selected"));
            model.put("show_age", new String("Age: None Selected"));
            model.put("show_metric", new String("Metric: None Selected"));
            model.put("show_change", new String("Metric Change: None Selected"));
            model.put("show_order", new String("Metric Order: None Selected"));

        } else {
            ArrayList<Subtask32> result = jdbc.getSubtask32(state_drop, sex_drop, age_drop, metric_drop, change_drop, order_drop);
            model.put("result", result);

            model.put("show_state", new String("State: " + state_drop));
            model.put("show_sex", new String("Sex: " + sex_drop));
            model.put("show_age", new String("Age: " + age_drop));
            model.put("show_metric", new String("Metric: " + metric_drop));
            model.put("show_change", new String("Metric Change: " + change_drop));
            model.put("show_order", new String("Metric Order: " + order_drop));
        }


        // Rendering the page
        context.render(TEMPLATE, model);
    }
}
