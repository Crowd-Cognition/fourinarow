//
// Created by Sina Bolouki on 27.03.24.
//
#include "../Peak code/heuristic.h"

struct moveResponse
{
    int index;
    int wait_time;
};

int main() {

    for (auto param : peak::params) {
        moveResponse output;
        peak::heuristic h;
        zet m;

        mt19937_64 generator;
        board b(binstringtouint64(bp),binstringtouint64(wp));
        double base_time;
    }
}
