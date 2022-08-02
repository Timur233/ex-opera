<?php
    namespace app\controllers;

    use app\core\Controller;
    use app\models\Model_Building_Steps;
    use app\models\Model_Main;
    use app\core\View;

    include "app/models/model_building_steps.php";

    class Controller_Main extends Controller
    {
        function action_index() {
            $data = Model_Main::get_data(LANG);	
            $data['footer']	= Model_Main::get_footer(LANG);

            if (PROJECT_ID !== ''):
                $data['building_steps'] = Model_Building_Steps::get_steps(LANG);
            endif;

            View::generate('index.twig', $data);
        }
        
    }
?>