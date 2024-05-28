#include "Peak code/heuristic.h"
#include "data_struct.h"
//#include "params.cpp"
//#include "utils.h"

#include <fstream>
#include <ctime>

void compute_planning_depth(peak::heuristic& h, data_struct& dat, const char* param_filename, const char* output_filename, int player, int group, int N){
    ofstream output(output_filename,ios::out);
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
    cout<<s<<endl;
    output<<s/(N*dat.Nboards)<<endl;
    cout<<s/(N*dat.Nboards)<<endl;
    output.close();
}

int main(int argc, const char* argv[]){
    data_struct dat;
    peak::heuristic h;
    mt19937_64 global_generator;
    global_generator.seed(unsigned(time(0)));
    const char* input_filename = argv[1];
    const char* param_filename = argv[2];
    int player = atoi(argv[3]);
    int group = atoi(argv[4]);
    const char* output_filename = argv[5];
    int N = atoi(argv[6]);
    dat.load_board_file(input_filename);
    cout<<dat.Nboards<<endl;
    compute_planning_depth(h,dat,param_filename,output_filename,player,group,N);
    return 0;
}
