import{u as n}from"./useQuery-EYeIpyY0.js";import{s as o}from"./index-BWPzpMko.js";function p(){return n({queryKey:["workout-plans"],queryFn:async()=>{const{data:r,error:t}=await o.from("workout_plans").select("*, plan_exercises(id)").order("created_at",{ascending:!1});if(t)throw new Error(`Failed to fetch workout plans: ${t.message}`);return(r||[]).map(a=>({...a,exercise_count:a.plan_exercises?.length??0}))}})}function w(r){return n({queryKey:["workout-plans",r],queryFn:async()=>{const{data:t,error:a}=await o.from("workout_plans").select("*").eq("id",r).single();if(a)throw new Error(`Failed to fetch workout plan: ${a.message}`);if(!t)throw new Error("Workout plan not found");return t},enabled:!!r})}function x(r){return n({queryKey:["workout-plans",r,"exercises"],queryFn:async()=>{const{data:t,error:a}=await o.from("workout_plans").select("*").eq("id",r).single();if(a)throw new Error(`Failed to fetch workout plan: ${a.message}`);if(!t)throw new Error("Workout plan not found");const s=t,{data:d,error:i}=await o.from("plan_exercises").select(`
          id,
          plan_id,
          exercise_id,
          order_index,
          created_at,
          target_sets,
          target_reps,
          tempo,
          exercise:exercises (
            id,
            name,
            description
          )
        `).eq("plan_id",r).order("order_index",{ascending:!0});if(i)throw new Error(`Failed to fetch plan exercises: ${i.message}`);const c=(d||[]).map(e=>({id:e.id,plan_id:e.plan_id,exercise_id:e.exercise_id,order_index:e.order_index,created_at:e.created_at,target_sets:e.target_sets,target_reps:e.target_reps,tempo:e.tempo,exercise:{id:e.exercise.id,name:e.exercise.name,description:e.exercise.description}}));return{id:s.id,name:s.name,description:s.description,created_at:s.created_at,updated_at:s.updated_at,user_id:s.user_id,exercises:c}},enabled:!!r})}export{x as a,w as b,p as u};
