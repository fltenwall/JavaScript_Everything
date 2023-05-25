public class Array07 {
    public static void main(String[] args){
        int[] arr = {3,4,5,5,9,4};
        int len = arr.length;
        int temp = 0;
        for (int i = 0; i < len / 2; i++) {
            temp = arr[len-1-i];
            arr[len-1-i] = arr[i];
            arr[i] = temp;
        }
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]+" ");
        }
        
    }
}