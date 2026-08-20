// Online Java Compiler
// Use this editor to write, compile and run your Java code online
import java.util.Stream;
class Main {
    public static void main(String[] args) {
        int n = IntStream.range(1,4).reduce(5, (x,akk) -> 2*akk + x );
        System.out.println("n = " + n);
    }
}