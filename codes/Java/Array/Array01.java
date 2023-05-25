import java.util.Scanner;
public class Array01{
    public static void main(String[] args){
        double scores[] = new double[5];

        Scanner myScanner = new Scanner(System.in);
        // 循环从控制台输入值
        for (int i = 0; i < scores.length; i++) {
            System.out.println("输出值");
            scores[i] = myScanner.nextDouble();
        }
        // 遍历输出值
        for (int i = 0; i < scores.length; i++) {
            System.out.println(scores[i]);
        }
    }
}