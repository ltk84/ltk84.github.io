import{u as y}from"./useQuery-EYeIpyY0.js";import{s as w}from"./index-BWPzpMko.js";import{g as f}from"./equipment-dn7oyoa5.js";function W(t){return y({queryKey:["exercise-history",t],queryFn:async()=>{const{data:c,error:a}=await w.from("session_exercises").select(`
          session_id,
          exercise_id,
          sessions (
            session_date,
            completed_at
          ),
          exercises (
            id,
            name,
            equipment_type
          ),
          sets (
            id,
            reps,
            weight,
            created_at
          )
        `).eq("exercise_id",t).not("sessions.completed_at","is",null).order("sessions(session_date)",{ascending:!1});if(a)throw a;return c?.map(r=>{const s=r.sets||[],n=f(r.exercises?.equipment_type),h=s.reduce((e,o)=>e+o.reps*o.weight*n,0),_=s.map(e=>e.weight),p=_.length>0?Math.max(..._):0,d=_.length>0?_.reduce((e,o)=>e+o,0)/_.length:0,i=s.reduce((e,o)=>e+o.reps,0);return{session_id:r.session_id,session_date:r.sessions.session_date,exercise_id:r.exercise_id,exercise_name:r.exercises.name,sets:s.map(e=>({id:e.id,reps:e.reps,weight_kg:e.weight,created_at:e.created_at})),total_volume:h,max_weight:p,avg_weight:d,total_reps:i}})||[]},enabled:!!t})}function b(t){return y({queryKey:["exercise-stats",t],queryFn:async()=>{const{data:c,error:a}=await w.from("session_exercises").select(`
          session_id,
          exercise_id,
          sessions (
            session_date,
            completed_at
          ),
          exercises (
            id,
            name,
            equipment_type
          ),
          sets (
            reps,
            weight
          )
        `).eq("exercise_id",t).not("sessions.completed_at","is",null);if(a)throw a;if(!c||c.length===0)return null;const l=c,r=f(l[0]?.exercises?.equipment_type),s=l.flatMap(o=>o.sets||[]),n=s.reduce((o,x)=>o+x.reps*x.weight*r,0),h=s.reduce((o,x)=>o+x.reps,0),_=s.map(o=>o.weight),p=_.length>0?Math.max(..._):0,d=l.map(o=>o.sessions.session_date).sort(),i=d[0]||null,e=d[d.length-1]||null;return{exercise_id:t,exercise_name:l[0]?.exercises?.name||"",total_sessions:l.length,total_volume:n,total_sets:s.length,total_reps:h,max_weight:p,latest_session_date:e,first_session_date:i}},enabled:!!t})}function F(t){return y({queryKey:["exercise-trend",t],queryFn:async()=>{const{data:c,error:a}=await w.from("session_exercises").select(`
          session_id,
          exercises (
            equipment_type
          ),
          sessions (
            session_date,
            completed_at
          ),
          sets (
            reps,
            weight
          )
        `).eq("exercise_id",t).not("sessions.completed_at","is",null).order("sessions(session_date)",{ascending:!0});if(a)throw a;return c?.map(r=>{const s=r.sets||[],n=f(r.exercises?.equipment_type),h=s.reduce((i,e)=>i+e.reps*e.weight*n,0),_=s.map(i=>i.weight),p=_.length>0?Math.max(..._):0,d=s.reduce((i,e)=>i+e.reps,0);return{date:r.sessions.session_date,weight:p,volume:h,reps:d,sets:s.length}})||[]},enabled:!!t})}function K(){return y({queryKey:["dashboard-stats"],queryFn:async()=>{const t=new Date,c=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=new Date(c);a.setDate(a.getDate()-7);const l=new Date(c);l.setDate(l.getDate()-14);const r=new Date(c);r.setDate(r.getDate()-r.getDay());const{data:s}=await w.from("sessions").select("id, total_volume, session_date").not("completed_at","is",null),n=s||[],h=n.length,_=n.reduce((u,m)=>u+(m.total_volume||0),0),p=n.filter(u=>new Date(u.session_date)>=a).reduce((u,m)=>u+(m.total_volume||0),0),d=n.filter(u=>{const m=new Date(u.session_date);return m>=l&&m<a}).reduce((u,m)=>u+(m.total_volume||0),0),i=n.filter(u=>new Date(u.session_date)>=a).length,e=n.filter(u=>new Date(u.session_date)>=r).length,o=[];for(let u=5;u>=0;u--){const m=new Date(c);m.setDate(m.getDate()-m.getDay()-u*7);const g=new Date(m);g.setDate(g.getDate()+7);const D=n.filter(k=>{const v=new Date(k.session_date);return v>=m&&v<g}).length;o.push(D)}const{count:x}=await w.from("exercises").select("*",{count:"exact",head:!0}),{count:q}=await w.from("workout_plans").select("*",{count:"exact",head:!0});return{total_sessions:h,total_exercises:x||0,total_workout_plans:q||0,total_volume:_,sessions_this_month:i,sessions_this_week:e,volume_7d:p,volume_prev_7d:d,weekly_sessions:o}}})}function V(t=5){return y({queryKey:["top-exercises",t],queryFn:async()=>{const{data:c,error:a}=await w.from("session_exercises").select(`
          exercise_id,
          exercises (
            id,
            name,
            equipment_type
          ),
          sessions!inner (
            completed_at
          ),
          sets (
            reps,
            weight
          )
        `).not("sessions.completed_at","is",null);if(a)throw a;const l=new Map;return c?.forEach(s=>{const n=s.exercise_id,h=s.exercises.name,_=s.sets||[],p=f(s.exercises?.equipment_type),d=_.reduce((e,o)=>e+o.reps*o.weight*p,0);l.has(n)||l.set(n,{name:h,volume:0,sessions:new Set});const i=l.get(n);i.volume+=d}),Array.from(l.entries()).map(([s,n])=>({exercise_id:s,exercise_name:n.name,total_volume:n.volume,session_count:n.sessions.size})).sort((s,n)=>n.total_volume-s.total_volume).slice(0,t)}})}function R(t=5){return y({queryKey:["recent-sessions",t],queryFn:async()=>{const{data:c,error:a}=await w.from("sessions").select(`
          id,
          session_date,
          notes,
          total_volume,
          workout_plans (
            name
          )
        `).not("completed_at","is",null).order("session_date",{ascending:!1}).limit(t);if(a)throw a;return c}})}function P(t,c,a){return y({queryKey:["previous-session-reference",t,c,a],queryFn:async()=>{if(c){const{data:i}=await w.from("session_exercises").select(`
            session_id,
            exercises (
              equipment_type
            ),
            sessions!inner (
              session_date,
              completed_at,
              plan_id,
              workout_plans (
                name
              )
            ),
            sets (
              reps,
              weight
            )
          `).eq("exercise_id",t).eq("sessions.plan_id",c).not("sessions.completed_at","is",null).order("sessions(session_date)",{ascending:!1}).limit(1);if(i&&i.length>0){const e=i[0],o=e.sets||[],x=f(e.exercises?.equipment_type),q=o.reduce((g,D)=>g+D.reps*D.weight*x,0),u=o.map(g=>g.weight),m=u.length>0?Math.max(...u):0;return{session_date:e.sessions.session_date,sets:o.map(g=>({reps:g.reps,weight_kg:g.weight})),total_volume:q,max_weight:m,plan_name:e.sessions.workout_plans?.name||null}}}const{data:l,error:r}=await w.from("session_exercises").select(`
          session_id,
          exercises (
            equipment_type
          ),
          sessions!inner (
            session_date,
            completed_at,
            plan_id,
            workout_plans (
              name
            )
          ),
          sets (
            reps,
            weight
          )
        `).eq("exercise_id",t).not("sessions.completed_at","is",null).order("sessions(session_date)",{ascending:!1}).limit(1);if(r)throw r;if(!l||l.length===0)return null;const s=l[0],n=s.sets||[],h=f(s.exercises?.equipment_type),_=n.reduce((i,e)=>i+e.reps*e.weight*h,0),p=n.map(i=>i.weight),d=p.length>0?Math.max(...p):0;return{session_date:s.sessions.session_date,sets:n.map(i=>({reps:i.reps,weight_kg:i.weight})),total_volume:_,max_weight:d,plan_name:s.sessions.workout_plans?.name||null}},enabled:!!t})}export{R as a,V as b,W as c,b as d,F as e,P as f,K as u};
