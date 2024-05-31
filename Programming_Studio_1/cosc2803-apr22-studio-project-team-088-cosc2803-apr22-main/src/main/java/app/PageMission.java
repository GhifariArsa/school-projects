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
public class PageMission implements Handler {

    // URL of this page relative to http://localhost:7001/
    public static final String URL = "/mission.html";

    @Override
    public void handle(Context context) throws Exception {
        // Create a simple HTML webpage in a String
        String html = "<html>";

        // Add some Head information
        html = html + "<head>" +
                "<title>Our Mission</title>";

        // Add some CSS (external file)
        html = html + """
            <link rel='stylesheet' type='text/css' href='common.css' />
            <link rel='stylesheet' type='text/css' href='pagemission.css' />
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

        // Add header content block
        html = html + """
                    <div class='subpageheader'>
                        <h1 class = subpageheading><span>Our Mission</span></h1>
                    </div>
                """;

        // Add Div for page Content
        html = html + "<div class='content'>";

        JDBCConnection jdbc = new JDBCConnection();
        String student1[] = jdbc.getStudent1();
        String student2[] = jdbc.getStudent2();

        ArrayList<Personas> resultsArthur = jdbc.getAttributes("Arthur Giovanni");
        ArrayList<Personas> resultsEmily = jdbc.getAttributes("Emily Rodriguez");
        
        //System.out.println(resultsArthur.get(0).getAttributeType());
        //System.out.println(resultsArthur.get(0).getAttributeType());



        html = html + """
                    <div class='missioncont'>
                        <div class='missionneu'>
                            <div class='missiontop'>
                                <p class='missionheading'>Addressing the social challenge:</p>
                            </div>
                            <div class='missionsplitter'></div>
                                <div class='missionbot'>
                                    <p class='text'>The social challenge that we chose was homelessness in Australia. Our definition of addressing the social challenge of homelessness is 
                                    by raising awareness and letting users have the freedom to navigate through and observe relevant data. Hence, our website's main goal is to 
                                    educate as well as to create an easy way for people to look at homelessness in Australia broadly and dive deeper into the issue should they wish to. 
                                    The website is also intended to be simple, minimalist, yet informative, with big facts such as the facts listed below, being one of the eye 
                                    catching information, thus, people that know nothing about homelessness can dip their feet into the situation. In addition, the website also has a 
                                    section for the data savvy where they can compare and get data from our informational database to research and find out more about homelessness.</p>
                                </div>   
                            </div>       
                        </div>
                    </div>

                    <div class='missioncont'>
                        <div class='missionneu'>
                            <div class='missiontop'>
                                <p class='missionheading'>How our site can be used:</p>
                            </div>
                            <div class='missionsplitter'></div>
                                <div class='missionbot'>
                                    <p class='text'>Users of all experience levels are more than welcome to examine data provided by our site. All pages
                                    found on our website can easily be accessed anytime through the navigation bar at the top of the site.
                                    For basic users who only want to learn about the big picture, feel free to visit our home page to find 
                                    3 big facts about homelessness in Australia. On the other hand, for users who want to take a shallow glance
                                    at some data, you can find what you're looking for in the subtask 2.1 and 2.2 pages. Finally, for our most data
                                    savvy users who want to take a deep dive into our data, subtasks 3.1 and 3.2 offer the opportunity to really examine
                                    homelessness in detail.</p>
                                </div>   
                            </div>       
                        </div>
                    </div>

                    <div class='personascont'>
                        <div class='personaleft'>
                            <div class='personacont'>
                                <div class='personaneu'>
                                    <div class='personatop'>
                                        <p class='personatitle'>Persona 1</p>
                                    </div>
                                    <div class='personasplitter'></div>
                                    <div class='personamid'>
                                        <img class='personapic' src='arthur.png' alt='persona image'>
                                    </div>
                                    <div class='personasplitter'></div>
                                    <div class='personabot'>
                                        <p class='personaattribute'>Name: </p>
                                        <ul><li class='personadesc'> """ + resultsArthur.get(0).getName() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsArthur.get(0).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsArthur.get(0).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsArthur.get(11).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsArthur.get(11).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsArthur.get(1).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsArthur.get(1).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsArthur.get(9).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(9).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(2).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(3).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsArthur.get(4).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(4).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(5).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(6).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsArthur.get(7).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(7).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(8).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'>""" + resultsArthur.get(10).getDescription() + """
                                        </li></ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='personassplitter'></div>

                        <div class='personaright'>
                            <div class='personacont'>
                                <div class='personaneu'>
                                    <div class='personatop'>
                                        <p class='personatitle'>Persona 2</p>
                                    </div>
                                    <div class='personasplitter'></div>
                                    <div class='personamid'>
                                        <img class='personapic' src='emily.png' alt='persona image'>
                                    </div>
                                    <div class='personasplitter'></div>
                                    <div class='personabot'>
                                        <p class='personaattribute'>Name: </p>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(0).getName() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsEmily.get(0).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(0).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsEmily.get(2).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(2).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsEmily.get(1).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(1).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsEmily.get(3).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(3).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(4).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(5).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsEmily.get(6).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(7).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(8).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'> """ + resultsArthur.get(6).getDescription() + """
                                        </li></ul>
                                        <p class='personaattribute'> """ + resultsEmily.get(10).getAttributeType() + """
                                        :</p>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(10).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(11).getDescription() + """
                                        </li></ul>
                                        <ul><li class='personadesc'> """ + resultsEmily.get(12).getDescription() + """
                                        </li></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class='teamcont'>
                        <div class='teamneu'>
                            <div class='teamtop'>
                                <p class='missionheading'>The team:</p>
                            </div>
                            <div class='teamsplitter'></div>
                                <div class='teambot'>
                                    <p class='teamtext'>
                                    """ + student1[1] + " (" + student1[0] + ") <br> Contact: " + student1[2] + "<br><br>" + student2[1] + " (" + student2[0] + ") <br> Contact: " + student2[2] + """
                                    </p>
                                </div>   
                            </div>       
                        </div>
                    </div>
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
