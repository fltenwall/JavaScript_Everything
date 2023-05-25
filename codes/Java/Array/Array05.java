public class Array05 {
    public static void main(String[] args){
        int[] arr = {3,4,5,5,9,4};
        int max = arr[0];

        for (int i = 0; i < arr.length; i++) {
            if(max<arr[i]){
                max = arr[i];
            }
        }

        System.out.println(max); // 9
    }
}
