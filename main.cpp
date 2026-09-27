#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream datei("lion.txt");

    if (!datei.is_open()) {
        std::cerr << "Fehler: Die Datei lion.txt konnte nicht geöffnet werden.\n";
        return 1;
    }

    std::string zeile;
    while (std::getline(datei, zeile)) {
        std::cout << zeile << '\n';
    }

    datei.close();
    return 0;
}
