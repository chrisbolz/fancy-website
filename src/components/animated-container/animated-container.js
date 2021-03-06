class AnimatedContainer extends HTMLElement {
    connectedCallback(){
        this.style.visibility='hidden';
        const instance=this;
        const callScroll=evt=>{
            instance.render();
        }
        window.addEventListener("load", callScroll);
        window.addEventListener("scroll", callScroll);
        this.render();
    }

    render(){
        const instance=this;
        const classesAdded = this.classes().filter(className=>instance.classList.contains(className)==false).length==0;
        if(this.isVisible()){
            this.style.visibility='visible';
            this.classes().forEach(className=>instance.classList.add(className));
        }
    }

    isVisible(){
        const rect = this.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    classes(){
        const withClasses=this.getAttribute('with-classes');
        if(withClasses!=null){
            if(withClasses.indexOf(',')==-1){
                return withClasses.split(' ');
            }else{
                return withClasses.split(',');
            }

        }else{
            return [];
        }
    }
}

if (!window.customElements) {
    customElements.define('animated-container', AnimatedContainer);
} else {
    window.customElements.define('animated-container', AnimatedContainer);
}

module.exports = AnimatedContainer;