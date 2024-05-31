package app;

/**
 * Class represeting a LGA from the Studio Project database
 * In the template, this only uses the code and name for 2016
 *
 * @author Timothy Wiley, 2022. email: timothy.wiley@rmit.edu.au
 */
public class LGA {
   // LGA 2016 Code
   private int code16;

   // LGA 2016 Name
   private String name16;

   private String lgaType;

   private double area;

   private double latitude;

   private double longitude;

   /**
    * Create an LGA and set the fields
    */
   public LGA(int code16, String name16, String lgaType, double area, double latitude, double longitude) {
      this.code16 = code16;
      this.name16 = name16;
      this.lgaType = lgaType;
      this.area = area;
      this.latitude = latitude;
      this.longitude = longitude;
   }

   public int getCode16() {
      return code16;
   }

   public String getName16() {
      return name16;
   }

   public String getLgaType() {
      return lgaType;
   }   

   public double getArea() {
      return area;
   }

   public double getLatitude() {
      return latitude;
   }

   public double getLongitude() {
      return longitude;
   }
}
