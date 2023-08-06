
public class Tread01 {
    public static void main(String[] args) {
        PrintNumber t1 = new PrintNumber();
        t1.start();
        System.out.println(Thread.currentThread().getName());
    }
}

class PrintNumber extends Thread{
    @Override
    public void run(){
            System.out.println(Thread.currentThread().getName());
    }
}