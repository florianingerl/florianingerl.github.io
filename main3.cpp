#include <string>
#include <iostream>

using namespace std;

string stupidFunction(){
    cout << "Stupid function executed!"<< endl;
    return "Max";
}

class Person {
private:
    std::string name = stupidFunction();
    int alter = 0;

public:
    //Person() = default;

    Person(const std::string& neuerName, int neuesAlter)
        : name(neuerName), alter(neuesAlter) {
    }
};

int main(){

    Person p;

    Person p2("Florian", 33);


    return 0;
}
