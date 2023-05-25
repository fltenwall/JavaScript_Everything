public class Array04 {
    public static void main(String[] args){
        char[] chars = new char[26];
        for (int i = 0; i < chars.length; i++) {
            chars[i] = (char)('A'+i);
        }
        for (int i = 0; i < chars.length; i++) {
            System.out.print(chars[i] + " ");
            //A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 
        }
    }
}
