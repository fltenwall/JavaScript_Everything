public class Array06 {
    public static void main(String[] args){
        int[] arr1 = {3,4,5,5,9,4};
        // 需要新开辟一个空间
        int[] arr2 = new int[arr1.length];

        for (int i = 0; i < arr1.length; i++) {
            arr2[i] = arr1[i];
        }
    }
}
