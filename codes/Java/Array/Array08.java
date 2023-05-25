public class Array08 {
    public static void main(String[] args){
        int[] arr1 = {3,4,5,5,9,4};
        int[] arr2 = new int[arr1.length];

        for (int i = arr2.length-1, j = 0; i>=0;i--,j++) {
            arr2[j] = arr1[i];
        }
        arr1 = arr2;
    }
}