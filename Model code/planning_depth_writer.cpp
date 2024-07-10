//
// Created by Sina Bolouki on 28.05.24.
//
#include<iostream>
#include "Peak code/heuristic.h"
#include "data_struct.h"

// Function to check if a file exists
bool fileExists(const std::string& filename) {
    std::ifstream file(filename);
    return file.is_open();
}

// Function to count the number of lines in a file
int countLines(const std::string& filename) {
    std::ifstream file(filename);
    int count = 0;
    std::string line;
    while (std::getline(file, line)) {
        count++;
    }
    return count;
}

// Function to create a file and add a default line
void createFileWithDefaultLine(const std::string& filename, const std::string& defaultLine) {
    std::ofstream file(filename, std::ios::app);
    if (file.tellp() == 0) { // Check if the file was empty
        file << defaultLine << std::endl;
    }
}


double compute_planning_depth(peak::heuristic& h, data_struct& dat, int player, int N){
    cout<<player<<endl;
    auto select_params = peak::params[player];
    h.get_params(select_params);
    double s=0.0;
    for(unsigned int i=0;i<dat.Nboards;i++){
        for(int n=0;n<N;n++){
            h.makemove_bfs(dat.alltrials[i].b,dat.alltrials[i].player);
            s+=h.game_tree->get_depth_of_pv();
            delete(h.game_tree);
        }
    }
//    cout<<s<<endl;
//    output<<s/(N*dat.Nboards)<<endl;
//    cout<<s/(N*dat.Nboards)<<endl;
//    output.close();
    return s/(N*dat.Nboards);
}

int main() {
    std::string filename = "planning_depth_test.csv";
    std::string header = "Planning Depth";
    int n = 0;
    if (fileExists(filename)) {
        n = countLines(filename) - 1;
        cout<<n<<std::endl;
    } else {
        createFileWithDefaultLine(filename, header);
    }
    std::ofstream writeFile(filename, std::ios::app);
    data_struct dat;
    peak::heuristic h;
    mt19937_64 global_generator(unsigned(time(0)));
    global_generator.seed();
    h.seed_generator(global_generator);
    const char* input_filename = "../../data_hvh.txt";
    int N = 4;
    dat.load_board_file(input_filename);
    cout<<dat.Nboards<<endl;
    for (; n < 200 ; n ++) {
        double val = compute_planning_depth(h, dat, n, N);
        writeFile << val << std::endl;
    }
    return 0;
}