package app;

import java.util.ArrayList;

import io.javalin.http.Context;
import io.javalin.http.Handler;

/**
 * Example Index HTML class using Javalin
 * <p>
 * Generate a static HTML page using Javalin
 * by writing the raw HTML into a Java String object
 *
 * @author Timothy Wiley, 2021. email: timothy.wiley@rmit.edu.au
 * @author Santha Sumanasekara, 2021. email: santha.sumanasekara@rmit.edu.au
 */
public class PageIndex implements Handler {

    // URL of this page relative to http://localhost:7001/
    public static final String URL = "/";

    @Override
    public void handle(Context context) throws Exception {
        // Create a simple HTML webpage in a String
        String html = "<html>";

        // Add some Header information
        html = html + "<head>" +
                "<title>Homepage</title>";

        // Add some CSS (external file)
        html = html + """
            <link rel='stylesheet' type='text/css' href='common.css' />
            <link rel='stylesheet' type='text/css' href='pageindex.css' />
            """;
        html = html + "</head>";

        // Add the body
        html = html + "<body>";

        // Add header content block
        html = html + """
                    <div class='header'>
                        <h1>
                            <a href='http://localhost:7001'>
                                <img src='FinalLogo.png' class='top-image' alt='logo' height='150'>
                            </a>  
                        </h1>
                    </div>
                """;

        // Add the topnav
        // This uses a Java v15+ Text Block
        html = html + """
                    <div class='topnav'>
                        <a href='/'><img src='home.png' height='14'>&ensp;Home</a>
                        <a href='mission.html'>Our Mission</a>
                        <div class='topnav-right'>
                    <a href='page6.html'>Change in Homelessness Over Time</a>
                    <a href='page5.html'>Comparing Homelessness to Other Factors</a>
                    <a href='page4.html'>Focused View on LGA</a>
                    <a href='page3.html'>Relative Proportion of Homelessness by LGAs</a>
                </div>
                    </div>
                """;


        // Add Div for page Content
        html = html + "<div class='content'>";

        // Add HTML for the list of pages (as well as topnav)
        html = html
                + """
                        <div class='container'>
                            <div class='parallax'>
                                <p class='DYK'>Did you know?</p>
                            </div>
                        </div>

                        <div class='factcont'>
                            <div class='neu'>
                                <div class='left'>
                                    <p class='facts'>More than 100,000 Australians experience homelessness whilst more than 150,000 Australians are at risk.*</p>
                                </div>
                                <div class='splitter'></div>
                                <div class='right'>
                                    <img class=factpic src='fact1.png' alt='Homeless statistic'>
                                </div>          
                            </div>
                        </div>

                        <div class='factcont'>
                            <div class='neu'>
                                <div class='left'>
                                    <p class='facts'>34% of people who are homeless or at risk of homelessness are only below the age of 20.*</p>
                                </div>
                                <div class='splitter'></div>
                                <div class='right'>
                                <img class=factpic src='fact3.png' alt='Homeless statistic'>
                                </div>          
                            </div>
                        </div>

                        <div class='factcont'>
                            <div class='neu'>
                                <div class='left'>
                                    <p class='facts'>There are 50% more women whom are homelesss or at risk of homelessness compared to men.*</p>
                                </div>
                                <div class='splitter'></div>
                                <div class='right'>
                                <img class=factpic src='fact2.png' alt='Homeless statistic'>
                                </div>          
                            </div>
                        </div>
                        """;

        JDBCConnection jdbc = new JDBCConnection();
        int countLGAS = jdbc.countLGAS();
        int population16[] = jdbc.countPop16();
        int population18[] = jdbc.countPop18();

        html = html + """
                <div class='statscont'>
                    <div class='statsleft'>
                        <div class='statcont'>
                            <div class='statneu'>
                                <div class='stattop'>
                                    <p class='statheading'>Total number of LGAs within data set:</p>
                                </div>
                                <div class='statsplitter'></div>
                                <div class='statbot'>
                                    <p class='LGA'>
                                    """ + countLGAS + """
                                    </p>
                                </div>          
                            </div>
                        </div>
                    </div>
                    <div class='statssplitter'></div>
                    <div class='statsright'>
                        <div class='statcont'>
                            <div class='statneu'>
                                <div class='stattop'>
                                    <p class='statheading'>Total country population within data set:</p>
                                </div>
                                <div class='statsplitter'></div>
                                <div class='statbot'>
                                    <ul>
                                        <li class='Population'>
                                        """ + population16[0] + " (" + population16[1] + ")" + """
                                        </li>
                                        <li class='Population'>
                                        """ + population18[0] + " (" + population18[1] + ")" + """
                                        </li>
                                    </ul>
                                </div>          
                            </div>
                        </div>
                    </div>
                </div>
                """;

        html = html + """
                    <p class=ref> *According to data obtained from 2018 dataset <br> 
                    Home page photo by Anonymous: <a href='https://pxhere.com/en/photo/1391409' style="color:#8d8d8d">/pxhere</a></p>
                    """;
                // Close Content div
        html = html + "</div>";

        // Footer
        html = html + """
                    <div class='footer'>
                        <div class=footercont>
                            <img src='footerlogo.png' height= 75px>
                            <p class=footertext> Made with &hearts; by Afif & Arsa. </p>
                            <p class=footertext> Copyright &copy; 2022 Homeless Lives Matter, All Rights Reserved.</p>
                            <p class=footertext> Powered by Javalin. </p>
                        </div>
                    </div>
                """;

        // Finish the HTML webpage
        html = html + "</body>" + "</html>";

        // DO NOT MODIFY THIS
        // Makes Javalin render the webpage
        context.html(html);
    }

}
